import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronRight, Heart } from "lucide-react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Subheading = ({ title }) => {
  // console.log(props);
  return (
    <span className="text-green-700 text-[1.25rem] font-bold">
    {title}
    </span>
  );
};

// see more component
const SeeMore = ({ text, onClick }) => {
  return (
    <button
      className="w-full flex justify-center border-none bg-transparent cursor-pointer font-bold"
    >
        <div className="w-26 h-18 rounded-full flex items-center justify-center bg-zinc-300">
          <span className="pl-2">{text}</span>
          <span className="text-red-500"><ChevronRight size={22} fill="red" /></span>
        </div>
    </button>
  );
};

//heart icon
const Heartclick = ({onClick, isFav}) => {
  // console.log(isFav);
  
  return isFav ? (
    <Heart
      fill="red"
      size={24}
      strokeWidth={0}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // fill();
        onClick(e);
      }}
    />
  ) : (
    <Heart
      strokeWidth={1}
      size={24}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // fill();
        onClick(e);
      }}
    />
  );
};

export default Subheading;
export { SeeMore, Heartclick };
