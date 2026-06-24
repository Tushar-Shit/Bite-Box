import { ShoppingBag, Search, UserRound, Component } from "lucide-react";
import { Heartclick } from "../atomic/atomic";
import { Link } from "react-router-dom";
import { useState } from "react";
const HorizontalFC = ({
  name,
  quantity,
  price,
  image,
  description,
  unit,
  id,
}) => {
  const [state, setState] = useState(false);
  const fill = () => {
    state ? setState(false) : setState(true);
  };

  async function handle(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!id) return;
    // try {
    //   const response = await fetch(
    //     `${import.meta.env.VITE_API_URL}/user/addfav`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         foodId: id,
    //       }),
    //     },
    //   );
    //   const {message} = await response.json();
    //   console.log(message);
    // } catch (e) {
    //   console.log(e);
    // }
  }

  return (
    <Link
      to={`/meal/${id}`}
      className="bg-zinc-200 p-3 mb-3 h-40 flex  gap-3 items-center rounded-lg"
    >
      {/* food image  */}
      <div className="flex-2 h-full rounded-l-lg">
        <img
          className="w-full h-full object-cover rounded-l-lg"
          src={image}
          alt=""
        />
      </div>
      {/* food name  */}
      <div className="flex-3">
        <div className="flex justify-between mt-2">
          <span className="text-md font ">
            <b>{name}</b>
          </span>
          <Heartclick onClick={handle} state={state} fill={fill} />
        </div>

        {/* short description  */}
        <div className="text-xs mb-2">{description}</div>
        {/* price rating  */}
        <p>
          {quantity} <span>{unit}</span>
        </p>
        <div className="flex justify-between text-md mb-2 relative">
          <div className="flex gap-2">
            <span>
              <b>₹{price}</b>
            </span>
            <span>🔥 4.3</span>
          </div>
          <button className="bg-zinc-100 p-1 rounded-full absolute -right-1 -bottom-1">
            <ShoppingBag strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HorizontalFC;
