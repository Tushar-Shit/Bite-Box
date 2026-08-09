import React from "react";

const Capsul = ({ text }) => {
  return (
    <div
      className="border w-fit py-1 px-1.5 rounded-xl text-lg shrink-0 cursor-pointer
     bg-gray-100 border-gray-300 hover:bg-gray-400 hover:text-white 
     transition-transform duration-300 ease-in-out hover:scale-110 "
    >
      {text}
    </div>
  );
};

export default Capsul;
