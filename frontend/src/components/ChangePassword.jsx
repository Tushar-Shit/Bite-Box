import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FailedMessage from "./FailedMessage";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState(false);
  const [FailMessage, setFailMessage] = useState("");
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    conNewPassword: "",
  });

  // input field tracker
  const handleOnchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);

  //changing password function
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.conNewPassword
    ) {
      setInvalid(true);
      setFailMessage("Please fill out all password fields.");
      return;
    } else if (formData.currentPassword === formData.newPassword) {
      setInvalid(true);
      setFailMessage("New password cannot be the same as Current password.");
      return;
    } else if (formData.newPassword !== formData.conNewPassword) {
      setInvalid(true);
      setFailMessage("The new password do not match.");
      return;
    }
    setInvalid(false);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user/password-change`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPass: formData.currentPassword,
          newPass: formData.newPassword,
        }),
      },
    );
    const data = await response.json();
    if (data.code === "failed") {
      setInvalid(true);
      setFailMessage(data.message);
      return;
    }
    navigate("/", {
      state: {
        message: data.message,
      },
    });
  };

  //reset variables
  const reset = () => {
    setInvalid(false);
    setFailMessage("");
  };
  return (
    <>
      {invalid && (
        <FailedMessage
          heading={"Password Change Failed"}
          message={FailMessage}
          reset={reset}
        />
      )}
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <form className=" w-[90%] max-w-md p-6 bg-white rounded-lg flex flex-col gap-3 shadow-[0_3px_20px_rgba(107,114,128,0.7)]">
          <div>
            <p className="mb-3 text-3xl font-bold justify-self-center">
              Change Password
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="currentPassword"
                className="text-md font-semibold text-black cursor-pointer"
              >
                Enter current password
                <span className="text-lg font-bold text-red-600">*</span>
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleOnchange}
                id="currentPassword"
                required
                className="border text-sm border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="newPassword"
                className="text-md font-semibold text-black cursor-pointer"
              >
                Enter new password
                <span className="text-lg font-bold text-red-600">*</span>
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleOnchange}
                id="newPassword"
                required
                className="border text-sm border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="conNewPassword"
                className="text-md font-semibold text-black cursor-pointer"
              >
                Confrim new password
                <span className="text-lg font-bold text-red-600">*</span>
              </label>
              <input
                type="password"
                name="conNewPassword"
                value={formData.conNewPassword}
                onChange={handleOnchange}
                id="conNewPassword"
                required
                className="border text-sm border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <button
            onClick={handleChangePassword}
            // disabled={}
            className={`w-full text-white py-3 rounded-lg 
              cursor-pointer bg-orange-600 hover:bg-red-700`}
            // ${ ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer bg-orange-600 hover:bg-red-700"}
            // `}
          >
            Change Password
            {/* { ? "Sending..." : "Send OTP"} */}
          </button>
          <Link
            to="/help"
            state={"fp"}
            className="text-right text-red-500 cursor-pointer"
          >
            Forget password?
          </Link>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
