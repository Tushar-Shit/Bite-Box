import React from "react";

const FailedMessage = ({heading, message, reset}) => {
  return (
    <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center">
      <div className="w-full max-w-sm overflow-hidden rounded-xl shadow-xl">
        <div className="bg-red-600 text-white px-6 py-4 text-center">
          <h2 className="text-xl font-semibold">{heading}</h2>
        </div>

        <div className="bg-white text-black px-6 py-5">
          <p className="text-center">{message}</p>

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
  );
};

export default FailedMessage;
