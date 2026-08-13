import React, { useState, useContext } from "react";
import AllCount from "../context/allCount";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FailedMessage from "./FailedMessage";
const ChangeEmail = ({ heading }) => {
  const [newEmail, setnewEmail] = useState("");
  const [submit, setsubmit] = useState(false);
  const [messageBox, setMessageBox] = useState(false);
  const [failMsg, setFailMsg] = useState("");
  const navigate = useNavigate();
  const {
    verifyCode,
    setVerifyCode,
    contextEmail,
    setContextEmail,
    user,
    userEmail,
  } = useContext(AllCount);

  async function otpHandler(e) {
    e.preventDefault();
    setsubmit(true);
    // path /update/email-change
    if (!newEmail) {
      setsubmit(false);
      setMessageBox(true);
      setFailMsg("Empty field");
      return;
    }
    try {
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
            newemail: newEmail,
          }),
        },
      );
      const data = await response.json();
      if (data.code === "failed") {
        setMessageBox(true);
        setFailMsg(data.message);
        return;
      }
      if (data.code === "success") {
        setContextEmail(data.email);
        setVerifyCode("EMAIL_CHANGE");
        navigate("/verify-email", {
          state: "ve",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  function reset() {
    setFailMsg("");
    setMessageBox(false);
    setsubmit(false);
    setnewEmail("");
  }
  return (
    <>
      {messageBox && (
        <FailedMessage
          heading="Verification failed"
          message={failMsg}
          reset={reset}
        />
      )}

      <div className="h-[80vh] flex flex-col items-center justify-center">
        <form
          onSubmit={otpHandler}
          className=" w-[90%] max-w-md p-6 bg-white rounded-lg flex flex-col gap-3 shadow-[0_3px_20px_rgba(107,114,128,0.7)]"
        >
          <div>
            <p className="mb-3 text-3xl font-bold justify-self-center">
              Change Email
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-md font-semibold text-black"
              >
                Enter a Vaild Email
                <span className="text-lg font-bold text-red-600">*</span>
              </label>
              <input
                type="email"
                name="newEmail"
                id="email"
                placeholder="robertjohn@gmail.com"
                value={newEmail}
                onChange={(e) => setnewEmail(e.target.value)}
                required
                className="border text-sm border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <button
            disabled={submit}
            className={`w-full text-white py-3 rounded-lg 
              ${submit ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer bg-orange-600 hover:bg-red-700"}
              `}
          >
            {submit ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangeEmail;
