import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  return (
    <form
      action=""
      method="POST"
      className="w-[90%] max-w-md p-6 bg-white rounded-lg shadow-sm flex flex-col  gap-3"
    >
      <div>
        <p className="text-lg font-bold justify-self-center">Change Password</p>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-zinc-700">
          Enter Current Password
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="robertjohn@gmail.com"
          required
          className="border text-sm border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-zinc-700">
          Enter New Password
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="robertjohn@gmail.com"
          required
          className="border text-sm border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-zinc-700">
          Confrim New Password
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="robertjohn@gmail.com"
          required
          className="border text-sm border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* styled the button for a complete UI look */}
      <button className="bg-orange-600 text-white rounded py-2 px-4 hover:bg-zinc-800 transition-colors font-medium mt-1">
        Save
      </button>

      <Link to="/notyet" className="text-xs text-red-600 underline">
        Forget Password?
      </Link>
    </form>
  );
};

//email change code
const ChangeEmail = () => {
  //taking data
  const [emails, setEmails] = useState({
    prevEmail: "",
    newEmail: "",
  });
  const [submit, setsubmit] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setEmails({
      ...emails,
      [e.target.name]: e.target.value,
    });
  }

  async function otpHandler(e) {
    e.preventDefault();
    setsubmit(true);
    // path /update/email-change
    if (emails.prevEmail === "" || emails.newEmail === "") {
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
          currentEmail: emails.prevEmail,
          newEmail: emails.newEmail,
        }),
      },
    );
    const data = await response.json();
    // console.log(data);
    if (data.code === "successful") {
      console.log("lets navigate");
      navigate("/verify-email", {
        state: "ve",
      });
    }
  }

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center">
      <form
        action=""
        method="POST"
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
              htmlFor="oldemail"
              className="text-md font-semibold text-black"
            >
              Enter the current Email
              <span className="text-lg font-bold text-red-600">*</span>
            </label>
            <input
              type="email"
              name="prevEmail"
              id="oldemail"
              placeholder="robertjohn@gmail.com"
              value={emails.prevEmail}
              onChange={handleChange}
              required
              className="border text-sm border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-md font-semibold text-black">
              Enter a Vaild Email
              <span className="text-lg font-bold text-red-600">*</span>
            </label>
            <input
              type="email"
              name="newEmail"
              id="email"
              placeholder="robertjohn@gmail.com"
              value={emails.newEmail}
              onChange={handleChange}
              required
              className="border text-sm border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <button
          disabled={submit}
          onClick={otpHandler}
          className={`w-full text-white py-3 rounded-lg cursor-pointer
              ${submit ? "bg-gray-400 cursor-not-allowed" : " bg-orange-600 hover:bg-red-700"}
              `}
        >
          {submit ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};
export default ChangePassword;
export { ChangeEmail };
