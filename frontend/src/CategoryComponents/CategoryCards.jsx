import { Heartclick } from "../atomic/atomic";
import { ChevronRight } from "lucide-react";
const CategoryCards = () => {
  return (
    <div className="shrink-0 w-[43%] h-fit shadow-[2px_2px_5px_rgba(0,0,0,0.4)] rounded-lg">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzvMyociTNf4UqFHzh5Iu5503ne7cfJkLbg&s"
        alt=""
        className="object-contain rounded-t-md"
      />
      <div className="flex flex-col items-center justify-between pt-1 pb-2 relative">
        <p className="font-bold text-lg">Chicken</p>
        <p className="font-semibold text-md">12 items</p>
        <span className="text-white bg-red-400 rounded-tl-lg rounded-br-lg absolute right-0 bottom-0">
          <ChevronRight />
        </span>
      </div>
    </div>
  );
};

export default CategoryCards;
