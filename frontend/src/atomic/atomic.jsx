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

//see more
const SeeMore = ({ path }) => {
  return (
    <Link to={path} className="w-full flex justify-center">
      <b>
        <div className="flex bg-zinc-200 text-red-500 p-1 px-2 items-center justify-center rounded-lg text-lg">
          seemore <ChevronRight size={16} />
        </div>
      </b>
    </Link>
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
