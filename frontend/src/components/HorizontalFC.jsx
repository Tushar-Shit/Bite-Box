import {
  ShoppingBag,
  Search,
  UserRound,
  Component,
} from "lucide-react";
import {Heartclick} from "../atomic/atomic";
import { Link } from "react-router-dom";
const HorizontalFC = (data) => {
  //   console.log(data);
  return (
    <Link to="/mealdetails" className="bg-zinc-200 p-3 mb-3 h-40 flex  gap-3 items-center rounded-lg">
      {/* food image  */}
      <div className="flex-2 h-full rounded-l-lg">
        <img
          className="w-full h-full object-cover rounded-l-lg"
          src={data.image}
          alt=""
        />
      </div>
      {/* food name  */}
      <div className="flex-3">
        <div className="flex justify-between mt-2">
          <span className="text-md font-bold ">
            <b>{data.item}</b>
          </span>
          <Heartclick />
        </div>

        {/* short description  */}
        <div className="text-xs mb-2">{data.para}</div>
        {/* price rating  */}
        <div className="flex justify-between text-md mb-2 relative">
          <div className="flex gap-2">
            <span>
              <b>₹100.000</b>
            </span>
            <span>🔥 4.3</span>
          </div>
          <button className="bg-zinc-100 p-1 rounded-full absolute -right-1 -bottom-1">
            <ShoppingBag strokeWidth={1} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HorizontalFC;
