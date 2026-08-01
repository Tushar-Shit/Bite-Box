import React, { useRef, useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import AllCount from "../context/allCount";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const username = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("email");
  const password = sessionStorage.getItem("password");
  const navigate = useNavigate();
  const {
    user,
    setUser,
    contextEmail,
    setContextEmail,
    verifyCode,
    setVerifyCode,
  } = useContext(AllCount);

  //resend OTP countdown
  const [time, setTime] = useState(30);
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

  //validate the OTP and check exact 6digits
  const getOTP = () => {
    const otp = [];

    for (const input of inputRefs.current) {
      if (!input || !/^[0-9]$/.test(input.value)) {
        return null;
      }

      otp.push(input.value);
    }

    return otp.join("");
  };

  //verify OTP function
  const [verifying, setVerifying] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [failmsg, setFailmsg] = useState("");
  const [messageBox, setMessageBox] = useState(false);
  async function verifyOTP(e) {
    e.preventDefault();
    setVerifying(true);
    const finalOTP = getOTP();

    if (!finalOTP) {
      setMessageBox(true);
      setInvalid(true);
      setFailmsg("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      if (verifyCode === "SIGNUP") {
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
              userOTP: finalOTP,
            }),
          },
        );
        const data = await response.json();
        if (data.code === "failed") {
          setUser(false);
          setMessageBox(true);
          setInvalid(true);
          setFailmsg(data.message);
          return;
        }
        if (data.code === "success") {
          setUser(true);
          sessionStorage.setItem("username", data.name);
          sessionStorage.setItem("user", JSON.stringify(true));
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("password");

          //merge session data and DB data.
          // if user created merge session and DB data
          const sessionFav = JSON.parse(sessionStorage.getItem("fav")) || [];
          const sessionCart = JSON.parse(sessionStorage.getItem("cart")) || [];
          const favResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/user/addfav`,
            {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ foodId: sessionFav }),
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
            ` ${import.meta.env.VITE_API_URL}/user/cart`,
            {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
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
          navigate("/", {
            state: data.message,
          });
          window.location.reload();
        }
      } else if (verifyCode === "EMAIL_CHANGE") {
        console.log("HELLO FROM EMAIL_CHANGE");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/update/verify-code`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              OTP: finalOTP,
            }),
          },
        );
        const data = await response.json();
        console.log(data.message);
        // navigate("/", {
        //   state: data.message,
        // });
        // window.location.reload();
      }
    } catch (err) {
      console.log(err);
      setUser(false);
      setMessageBox(true);
      setFailmsg("Something unexpected occur please try again later");
    }
  }

  //resend otp function
  const [spinner, setSpinner] = useState(false);
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
      if (data.code === "failed" || data.code === "error") {
        setSpinner(false);
        setMessageBox(true);
        setFailmsg(data.message);
      }
      if (data.code === "successful") setSpinner(false);
    } catch (err) {
      setSpinner(false);
      setMessageBox(true);
      setFailmsg("Server error try again later.");
      console.log(err);
    }
  }

  function reset() {
    setFailmsg("");
    setMessageBox(false);
    setInvalid(false);
    setVerifying(false);
    setSpinner(false);
  }
  return (
    <>
      <Helmet>
        <title>BiteBox | Verify Signup OTP</title>
      </Helmet>
      {spinner && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* failed message card */}
      {messageBox && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center">
          <div className="w-full max-w-sm overflow-hidden rounded-xl shadow-xl">
            <div className="bg-red-600 text-white px-6 py-4 text-center">
              <h2 className="text-xl font-semibold">Varification Failed</h2>
            </div>

            <div className="bg-white text-black px-6 py-5">
              <p className="text-center">{failmsg}</p>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={reset}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="h-full flex items-center justify-center px-5">
        <form
          onSubmit={verifyOTP}
          className="border-t w-full max-w-md bg-white rounded-3xl shadow-xl p-6 text-center shadow-black"
        >
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
                className={`w-12 h-14  border-2 ${invalid ? "border-red-600 focus:border-red-600" : "border-gray-200"} rounded-xl text-center text-2xl font-bold outline-none focus:border-green-500`}
              />
            ))}
          </div>

          <button
            disabled={verifying}
            className={`w-[90%] mt-3 ${verifying ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer bg-orange-600 hover:bg-red-700"} transition text-white py-3 rounded-xl font-semibold`}
          >
            {verifying ? "Varifying..." : "Verify OTP"}
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
        </form>
      </div>
    </>
  );
};

export default VerifyOTP;
