import { Minus, Plus, Trash2, Star } from "lucide-react";
import { useState, useEffect } from "react";

const CartCard = ({
  id,
  image,
  name,
  defaultQuantity,
  unit,
  defaultPrice,
  foodUnit,
  onClick,
  satisfymessage,
}) => {
  //master function for delete, increase, decrease
  const masterFunc = async (commandVal) => {
    if (!id) return;
    // const user = JSON.parse(sessionStorage.getItem("user"));
    // if (user === false) {

    //   return;
    // }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/cart`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FId: id,
          FQuantity: defaultQuantity,
          FPrice: defaultPrice,
          command: commandVal, //add/dlt, increase, decrease
        }),
      });
      const { message } = await res.json();
      satisfymessage(message);
      // console.log(message);
      onClick();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-35 p-2 bg-zinc-200 flex items-center justify-between gap-1 rounded-lg">
      <div className="h-full w-2/5">
        <img src={image} alt="" className="object-cover h-full w-full" />
      </div>
      <div className=" w-3/5 h-full flex flex-col justify-center px-2">
        <div className="text-lg font-bold">{name}</div>
        <div className="text-sm">
          {defaultQuantity} {unit}
        </div>
        <div className="flex gap-3 items-center">
          <div className="text-md font-semibold">₹{defaultPrice}</div>
          <div className="flex gap-0.5">
            <Star size={12} fill="black" />
            <Star size={12} fill="black" />
            <Star size={12} fill="black" />
            <Star size={12} fill="black" />
            <Star size={12} />
          </div>
        </div>
        <div className="text-[12px] font-bold text-red-700">
          {defaultPrice * foodUnit}
        </div>
        {/* <div className="text-[12px] font-bold text-red-700">Out of Stock</div> */}

        <div className="mt-0.5 flex justify-around items-center ">
          <div className="flex justify-evenly gap-2 items-center bg-zinc-100 rounded-2xl p-1">
            <button
              onClick={() => {
                if (foodUnit <= 1) return;
                masterFunc("decrease");
              }}
              className=" text-red-700 rounded-full p-0.5 border-none cursor-pointer flex items-center justify-center"
            >
              <Minus size={18} />
            </button>
            <div className="font-semibold mx-1 w-4 text-center">{foodUnit}</div>
            <button
              onClick={() => {
                masterFunc("increase");
              }}
              className="text-green-700 rounded-full p-0.5 border-none cursor-pointer flex items-center justify-center"
            >
              <Plus size={18} />
            </button>
          </div>
          <div
            className="flex items-center text-sm font-medium bg-zinc-800 text-white p-1 px-2 rounded-lg cursor-pointer"
            onClick={() => masterFunc("add/dlt")}
          >
            <Trash2 size={15} />
            Delete
          </div>
        </div>
        {/* <div className="border mt-0.5"></div> */}
      </div>
    </div>
  );
};

export default CartCard;
