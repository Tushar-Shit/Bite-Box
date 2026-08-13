import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CustomNav from "../CategoryComponents/CustomNav";
import FailedMessage from "./FailedMessage";
function ResetPassword() {
  const { token } = useParams();
  const key = token;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: "",
    conNewPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [failed, setFailed] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  //login function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword === "" || formData.conNewPassword === "") {
      setFailed(true);
      setMessage("Please fill out all the fields.");
      return;
    } else if (formData.newPassword !== formData.conNewPassword) {
      setFailed(true);
      setMessage("Password not match");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: key,
            newPass: formData.newPassword,
          }),
        },
      );
      const data = await response.json();
      if (data.code === "failed") {
        setFailed(true);
        setMessage(data.message);
        return;
      }
      if (data.code === "success") {
        setSuccess(true);
        setFailed(true);
        setMessage(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function reset() {
    setFailed(false);
    setMessage("");
    setProcessing(false);
    setSuccess(false);
  }
  return (
    <>
      <Helmet>
        <title>BiteBox | ResetPassword</title>
      </Helmet>

      {failed && (
        <FailedMessage
          heading={success ? "Successfull" : "Reset Password Failed"}
          message={message}
          reset={reset}
        />
      )}

      <CustomNav text="Reset Password" path="/" />
      <div className="h-[90vh] flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Create New Password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="newPass"
                className="block mb-1 font-medium cursor-pointer"
              >
                Enter New Password
                <span className="text-red-600 text-md font-bold">*</span>
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPass"
                placeholder="Enter New Password"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="conNewPass"
                className="block mb-1 font-medium cursor-pointer"
              >
                Confrim New Password
                <span className="text-red-600 text-md font-bold">*</span>
              </label>
              <input
                type="password"
                name="conNewPassword"
                id="conNewPass"
                placeholder="Confrim New Password"
                value={formData.conNewPassword}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              // disabled={processing}
              className={`w-full ${processing ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-red-700 cursor-pointer"}  text-white py-3 rounded-lg`}
            >
              {processing ? "Processing..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
