import React, { useRef, useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import AllCount from "../context/allCount";
import { useNavigate } from "react-router-dom";
import FailedMessage from "./FailedMessage";

const VerifyOTP = () => {
  const username = sessionStorage.getItem("username");
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

  useEffect(() => {
    if (verifyCode === "EMAIL_CHANGE") {
      const isMissingData = !user || !contextEmail;

      if (isMissingData) {
        setMessageBox(true);
        setFailmsg("Fail to get email, please try from beginning");
      }
    }
  }, [user, verifyCode, contextEmail]);

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
  }, [wait]);

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
              email: contextEmail,
              userOTP: finalOTP,
            }),
          },
        );
        const data = await response.json();
        if (data.code === "failed") {
          setUser(null);
          setMessageBox(true);
          setInvalid(true);
          setFailmsg(data.message);
          return;
        }
        if (data.code === "success") {
          setUser({
            userId: data.user.userid,
            userName: data.user.username,
            userEmail: data.user.useremail,
            userRole: data.user.userrole,
          });
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("password");

          //merge session data and DB data.
          // if user created merge session and DB data
          const sessionFav = JSON.parse(sessionStorage.getItem("fav")) || [];
          const sessionCart = JSON.parse(sessionStorage.getItem("cart")) || [];
          const favResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/update/favourite`,
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
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/email-change`,
          {
            method: "PATCH",
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
        if (data.code === "failed") {
          setMessageBox(true);
          setInvalid(true);
          setFailmsg(data.message);
          return;
        }
        navigate("/", {
          state: {
            message: data.message,
          },
        });
        // window.loaction.reload();
      }
    } catch (err) {
      console.log(err);
      setUser(null);
      setMessageBox(true);
      setFailmsg("Something unexpected occur please try again later");
    }
  }

  //resend otp function
  const [spinner, setSpinner] = useState(false);
  async function resendCode() {
    setSpinner(true);
    if (!contextEmail) {
      setMessageBox(true);
      setFailmsg("Fail to get email, please try from begining");
      return;
    }
    try {
      //resend otp in signup process
      if (verifyCode === "SIGNUP") {
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
              email: contextEmail,
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
        if (data.code === "successful") {
          setWait(true);
          setTime(30);
          setSpinner(false);
        }
      }
      //resend otp in email change process
      else if (verifyCode === "EMAIL_CHANGE") {
        console.log(contextEmail);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/email-change`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: user.userName,
              useremail: user.userEmail,
              newemail: contextEmail,
            }),
          },
        );
        const data = await response.json();
        if (data.code === "failed" || data.code === "error") {
          setSpinner(false);
          setMessageBox(true);
          setFailmsg(data.message);
        }
        if (data.code === "success") {
          console.log(data.message);
          setWait(true);
          setTime(30);
          setSpinner(false);
        }
      }
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
      {spinner && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* failed message card */}
      {messageBox && (
        <FailedMessage
          heading="Verification Failed"
          message={failmsg}
          reset={reset}
        />
      )}

      <div className="h-full flex items-center justify-center px-5">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 text-center shadow-[0_3px_20px_rgba(107,114,128,0.7)]">
          <form onSubmit={verifyOTP}>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">
                Verify Your Email
              </h1>
              <p className="mt-3">We've sent a 6-digit verification code to</p>
              <p className="font-semibold text-gray-500 mt-1">{contextEmail}</p>
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
          </form>
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
