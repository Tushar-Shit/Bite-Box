import React from "react";
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

      <Link to="/notyet" className="text-xs text-red-600 underline">Forget Password?</Link>
    </form>
  );
};

//email change code
const ChangeEmail = () => {
  return (
    <form
      action=""
      method="POST"
      className="w-[90%] max-w-md p-6 bg-white rounded-lg shadow-sm flex flex-col  gap-3"
    >
      <div>
        <p className="text-lg font-bold justify-self-center">Change Email</p>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-zinc-700">
          Enter a Vaild Email
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

      <button className="bg-orange-600 text-white rounded py-2 px-4 hover:bg-zinc-800 transition-colors font-medium mt-1">
        Send OTP
      </button>

    </form>
  );
};
export default ChangePassword;
export { ChangeEmail };
