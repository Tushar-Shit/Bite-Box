import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const username = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("email");
  const password = sessionStorage.getItem("password");
  const navigate = useNavigate();

  //supporting UI chages variables
  const [invalid, setInvalid] = useState(false);
  const [failmsg, setFailmsg] = useState("");
  const [spinner, setSpinner] = useState(false);

  //UI changes and resend countdown
  const [time, setTime] = useState(59);
  const [wait, setWait] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setWait(false);
          return 0;
        }
        setWait(true);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //  resend code after 1 minute
  async function resendCode() {
    setSpinner(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup/resend-otp`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        },
      );
      const data = await response.json();
      if (data.code === "successful") window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  //autometically move focus while entering code
  const inputRefs = useRef([]);
  const handleChange = (e, index) => {
    const value = e.target.value;
    // Allow only digits
    if (!/^\d?$/.test(value)) {
      e.target.value = "";
      return;
    }
    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  //verify code and signup/login process
  async function verifyCode() {
    const inputArray = inputRefs.current.map((item) => Number(item.value));
    if (inputArray.length !== 6) {
      return alert("Code must be 6 digits.");
    }

    //make a single 6 digit number
    const finalCode = inputArray.reduce((acc, currentVal) => {
      return acc * 10 + currentVal;
    }, 0);

    //verify the OTP
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/signup/verify-otp`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          userOTP: finalCode,
        }),
      },
    );
    const data = await response.json();

    // if user not created show message
    if (!(data.code === "created")) {
      setInvalid(true);
      setFailmsg(data.message);
      return;
    }

    //if user created merge session and DB data
    const sessionFav = JSON.parse(sessionStorage.getItem("fav")) || [];
    const sessionCart = JSON.parse(sessionStorage.getItem("cart")) || [];

    const favResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/user/addfav`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodId: sessionFav,
        }),
      },
    );
    const { message } = await favResponse.json();
    if (message === "Add to Favourite") {
      sessionStorage.removeItem("fav");
    }

    const cartDetails = sessionCart.map((item) => ({
      id: item._id,
      quantity: item.quantity,
    }));

    const cartResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/user/cart`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: cartDetails,
          command: "SCA", //Session Cart Add
        }),
      },
    );
    const cartData = await cartResponse.json();
    if (cartData.message === "Added to Cart") {
      sessionStorage.removeItem("cart");
    }

    sessionStorage.removeItem("username");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");

    navigate("/", {
      state: {
        message: data.message,
      },
    });
    window.location.reload(); //forcefully reload the page after login
  }

  return (
    <>
      {spinner && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="h-full flex items-center justify-center px-5">
        <div className="border-t w-full max-w-md bg-white rounded-3xl shadow-xl p-6 text-center shadow-black">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Verify Your Email
            </h1>
            <p className="mt-3">We've sent a 6-digit verification code to</p>
            <p className="font-semibold text-gray-500 mt-1">{email}</p>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-between gap-3 mt-5">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <input
                autoFocus={index === 0}
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength={1}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => {
                  if (e.key === "Tab" && !e.target.value) {
                    e.preventDefault();
                  }

                  if (e.key === "Backspace" && !e.target.value && index > 0) {
                    inputRefs.current[index - 1].focus();
                  }
                }}
                required
                className={`w-12 h-14 border-2 ${invalid ? "border-red-600 focus:border-red-600" : "border-gray-200"} rounded-xl text-center text-2xl font-bold outline-none focus:border-green-500`}
              />
            ))}
          </div>

          {invalid && (
            <div className="py-2 px-5 text-left text-red-600 font-semibold text-sm">
              <p>{failmsg}</p>
            </div>
          )}

          <button
            onClick={verifyCode}
            className={`w-[90%] ${invalid ? "mt-0" : "mt-3"} bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-xl font-semibold`}
          >
            Verify OTP
          </button>
          <div className="mt-4 text-center flex items-baseline-last justify-between">
            <p className="text-sm">Didn't receive the code?</p>

            <button
              disabled={wait}
              onClick={resendCode}
              className={`mt-2 text-sm font-semibold 
            ${wait ? "text-gray-500 cursor-not-allowed" : "text-black cursor-pointer underline"}`}
            >
              {wait ? `Resend OTP in ${time} seconds` : "Resend OTP"}
            </button>
          </div>

          <div className="mt-2 rounded-xl bg-amber-50 border border-amber-300 p-2">
            <p className="text-sm text-amber-900">
              <span className="font-bold">Tip: </span>
              <span>Please check your </span>
              <span className="font-bold">Spam</span> or{" "}
              <span className="font-bold">Junk </span>
              folder before requesting new OTP.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
