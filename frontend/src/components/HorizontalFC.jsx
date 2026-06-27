import { ShoppingBag, Search, UserRound, Component } from "lucide-react";
import { Heartclick } from "../atomic/atomic";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const HorizontalFC = ({
  name,
  quantity,
  price,
  image,
  description,
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
          <Heartclick onClick={handle} isFav={hello} />
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
