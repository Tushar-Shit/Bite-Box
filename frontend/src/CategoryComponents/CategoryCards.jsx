import { Heartclick } from "../atomic/atomic";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
const CategoryCards = ({text,items,image}) => {
  // console.log(data);
  return (
    <Link  to={`/categories/${text}`} className="shrink-0 w-[43%] h-50 shadow-[2px_2px_5px_rgba(0,0,0,0.4)] rounded-lg">
      <img
        src={image}
        alt=""
        className="h-[68%] w-full object-cover rounded-t-md"
      />
      <div className="flex flex-col items-center justify-between pt-1 pb-2 relative">
        <p className="font-bold text-lg">{text}</p>
        <p className="font-semibold text-md">{items} items</p>
        <span className="text-white bg-red-400 rounded-tl-lg rounded-br-lg absolute right-0 bottom-0">
          <ChevronRight />
        </span>
      </div>
    </Link>
  );
};

export default CategoryCards;
