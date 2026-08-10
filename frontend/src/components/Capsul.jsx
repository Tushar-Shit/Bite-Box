import React from "react";

const Capsul = ({ text, setSearchText }) => {
  // setSearchText(text);
  return (
    <button
      onClick={() => setSearchText(text)}
      className="border w-fit py-1 px-1.5 rounded-xl text-sm shrink-0 cursor-pointer
     bg-gray-100 border-gray-300 hover:bg-gray-400 hover:text-white 
     transition-transform duration-300 ease-in-out hover:scale-110 "
    >
      {text}
    </button>
  );
};

export default Capsul;
