import React, { useState, useContext } from "react";
import AllCount from "../context/allCount";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FailedMessage from "./FailedMessage";
const ForgetPassword = () => {
  const [newEmail, setnewEmail] = useState("");
  const [submit, setsubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageBox, setMessageBox] = useState(false);
  const [failMsg, setFailMsg] = useState("");
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    setsubmit(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/forget-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newEmail,
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
      setsubmit(false);
      setMessageBox(true);
      setFailMsg(data.message);
      setSuccess(true);
    }
  }

  function reset() {
    setFailMsg("");
    setnewEmail("");
    setMessageBox(false);
    setsubmit(false);
    setSuccess(false);
  }

  return (
    <>
      {messageBox && (
        <FailedMessage
          heading={success ? "Email Send" : "Verification failed"}
          message={failMsg}
          reset={reset}
        />
      )}

      <div className="h-[80vh] flex flex-col items-center justify-center">
        <form
          onSubmit={submitHandler}
          className=" w-[90%] max-w-md p-6 bg-white rounded-lg flex flex-col gap-3 shadow-[0_3px_20px_rgba(107,114,128,0.7)]"
        >
          <div>
            <p className="mb-3 text-3xl font-bold justify-self-center">
              Forget Password
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-md font-semibold text-black"
              >
                Enter the Registered Email
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
            {submit ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
