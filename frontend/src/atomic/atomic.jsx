import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronRight, Heart } from "lucide-react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Subheading = ({ title }) => {
  // console.log(props);
  return (
    <span className="text-green-700 text-[1.25rem]">
      <b>{title}</b>
    </span>
  );
};

// see more component
const SeeMore = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="w-full flex justify-center border-none bg-transparent cursor-pointer">
      <b>
        <div className="flex bg-zinc-200 text-red-500 p-1 px-2 items-center justify-center rounded-lg text-lg">
          {text} <ChevronRight size={16} />
        </div>
      </b>
    </button>
  );
};

//heart icon
const Heartclick = () => {
  const [state, setState] = useState(true);
  const fill = () => {
    state ? setState(false) : setState(true);
  };
  return state ? (
    <Heart
      strokeWidth={1}
      size={24}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        fill();
      }}
    />
  ) : (
    <Heart
      fill="red"
      size={24}
      strokeWidth={0}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        fill();
      }}
    />
  );
};

export default Subheading;
export { SeeMore, Heartclick };
