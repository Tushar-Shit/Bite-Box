import React, { useState, useContext } from "react";
import AllCount from "../context/allCount";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ChangeEmail = () => {
  const [newEmail, setnewEmail] = useState("");
  const [submit, setsubmit] = useState(false);
  const [messageBox, setMessageBox] = useState(false);
  const [failMsg, setFailMsg] = useState("");
  const navigate = useNavigate();
  const { verifyCode, setVerifyCode, contextEmail, setContextEmail } = useContext(AllCount);
  async function otpHandler(e) {
    e.preventDefault();
    setsubmit(true);
    // path /update/email-change
    if (!newEmail) {
      setsubmit(false);
      return alert(" empty field ");
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/update/email-change`,
      {
        method: "POST",
        credentials: "include",
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
      setContextEmail(data.email);
      setVerifyCode("EMAIL_CHANGE")
      navigate("/verify-email", {
        state: "ve",
      });
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
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center">
          <div className="w-full max-w-sm overflow-hidden rounded-xl shadow-xl">
            <div className="bg-red-600 text-white px-6 py-4 text-center">
              <h2 className="text-xl font-semibold">Varification Failed</h2>
            </div>

            <div className="bg-white text-black px-6 py-5">
              <p className="text-center">{failMsg}</p>

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
