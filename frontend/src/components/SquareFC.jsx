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
import { useState, useEffect } from "react";
import { Heartclick } from "../atomic/atomic";
import { Link } from "react-router-dom";
const SquareFC = ({
  image,
  name,
  quantity,
  price,
  category,
  unit,
  id,
  isFav,
}) => {
  const [hello, setHello] = useState(isFav);
  useEffect(() => {
    setHello(isFav);
  }, [isFav]);
  const handle = async (e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling

    if (!id) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/addfav`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            foodId: id,
          }),
        },
      );

      const { message } = await response.json();
      console.log(message);
      setHello((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Link
      to={`/meal/${id}`}
      className="shrink-0 w-[45%] h-55 shadow-[2px_2px_5px_rgba(0,0,0,0.4)] rounded-lg relative"
    >
      <div className="bg-zinc-50 rounded-full p-1 w-7 h-7 absolute right-1 top-1 flex items-center">
        <Heartclick onClick={handle} isFav={hello} />
      </div>

      <div className="h-[60%]">
        <img
          src={image}
          alt={name}
          className=" h-full w-full object-cover rounded-t-md"
        />
      </div>
      <div className="flex flex-col p-2 pl-3 text-md">
        <p className="font-bold truncate">{name}</p>
        <p className="">
          {quantity} {unit}
        </p>
        <div className="flex justify-between">
          <p className="font-bold ">₹{price}</p>
          <span className="mr-3">🔥 4.3</span>
        </div>
      </div>
    </Link>
  );
};

export default SquareFC;
