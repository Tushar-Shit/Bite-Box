import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center">
      <form
        // onSubmit={}
        className=" w-[90%] max-w-md p-6 bg-white rounded-lg flex flex-col gap-3 shadow-[0_3px_20px_rgba(107,114,128,0.7)]"
      >
        <div>
          <p className="mb-3 text-3xl font-bold justify-self-center">
            Change Password
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-md font-semibold text-black">
              Enter current password
              <span className="text-lg font-bold text-red-600">*</span>
            </label>
            <input
              type="password"
              name="newEmail"
              id="email"
              required
              className="border text-sm border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-md font-semibold text-black">
              Enter new password
              <span className="text-lg font-bold text-red-600">*</span>
            </label>
            <input
              type="password"
              name="newEmail"
              id="email"
              required
              className="border text-sm border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-md font-semibold text-black">
              Confrim new password
              <span className="text-lg font-bold text-red-600">*</span>
            </label>
            <input
              type="password"
              name="newEmail"
              id="email"
              required
              className="border text-sm border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <button
          // disabled={}
          className={`w-full text-white py-3 rounded-lg 
              cursor-pointer bg-orange-600 hover:bg-red-700`}
              // ${ ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer bg-orange-600 hover:bg-red-700"}
              // `}
        >
         Change Password
          {/* { ? "Sending..." : "Send OTP"} */}
        </button>
        <p className="text-right text-red-500 cursor-pointer">Forget password?</p>
      </form>
      
    </div>
  );
};

export default ChangePassword;
