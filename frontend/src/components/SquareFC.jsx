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
import { Link } from "react-router-dom";
const SquareFC = ({ image, name, quantity, price,category,id}) => {
// console.log(category+"  "+id);
  return (
    <Link to={`/meal/${id}`}
      className="shrink-0 w-[45%] h-65 shadow-[2px_2px_5px_rgba(0,0,0,0.4)] rounded-lg relative"
    >
      <div className="bg-zinc-50 rounded-full p-1 w-7 h-7 absolute right-1 top-1 flex items-center">
        <Heartclick />
      </div>

      <div>
        <img
          src={image}
          alt={name}
          className=" w-full max-h-40 object-contain rounded-t-md"
        />
      </div>
      <div className="flex flex-col gap-1 p-2 pl-3 text-md">
        <p className="font-bold truncate">{name}</p>
        <p className="">{quantity} /plate/piece</p>
        <div className="flex justify-between">
          <p className="font-bold ">{price}</p>
          <span className="mr-3">🔥 4.3</span>
        </div>
      </div>
    </Link>
  );
};

export default SquareFC;
