import {
  House,
  Blocks,
  Bell,
  ShoppingCart,
  ShoppingBag,
  Search,
  NotebookPen,
  UserRound,
  Utensils,
  Component,
} from "lucide-react";
import { Heartclick } from "../atomic/atomic";
const SquareFC = () => {
  return (
    <div className="shrink-0 w-[40%] h-fit shadow-[2px_2px_5px_rgba(0,0,0,0.4)] rounded-lg relative">
      <div className="bg-zinc-50 rounded-full p-1 w-7 h-7 absolute right-1 top-1 flex items-center">
        <Heartclick />
      </div>

      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzvMyociTNf4UqFHzh5Iu5503ne7cfJkLbg&s"
          alt=""
          className="object-contain rounded-t-md"
        />
      </div>
      <div className="p-2 pl-3 text-md">
        <p className="font-bold ">Chicken Lolipop</p>
        <p className="">6 piece</p>
        <div className="flex justify-between">
          <p className="font-bold ">₹170</p>
          <span className="mr-3">🔥 4.3</span>
        </div>
      </div>
    </div>
  );
};

export default SquareFC;
