import { Minus, Plus, Trash2, Star } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import AllCount from "../context/allCount";
const CartCard = ({
  id,
  image,
  name,
  servingQuantity,
  quantity,
  unit,
  defaultPrice,
  foodUnit,
  available,
  satisfymessage,
}) => {
  const { favCount, setFavCount, cartCount, setCartCount } =
    useContext(AllCount);

  //master function for delete, increase, decrease in both session, DB
  const masterFunc = async (commandVal) => {
    if (!id) return;

    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user === false) {
      let sessionCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const existItem = sessionCart.find((item) => item._id === id);
      if (existItem) {
        commandVal === "increase" &&
          (existItem.quantity++, satisfymessage("item increased"));

        commandVal === "decrease" &&
          (existItem.quantity--, satisfymessage("item decreased"));

        commandVal === "add/dlt" &&
          ((sessionCart = sessionCart.filter((item) => item._id !== id)),
          satisfymessage("Item Removed"));
      }
      sessionStorage.setItem("cart", JSON.stringify(sessionCart));
      setCartCount(sessionCart.length);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/cart`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [{ id: id, quantity: quantity }],
          command: commandVal, //add/dlt, increase, decrease
        }),
      });
      const { message } = await res.json();
      satisfymessage(message);

      const cartRes = await fetch(`${import.meta.env.VITE_API_URL}/user/cart`, {
        credentials: "include",
      });
      const totalCart = await cartRes.json();
      setCartCount(totalCart.length);
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
        <div className="w-9/10 text-lg font-bold truncate">{name}</div>
        <div
          id="serve-quantity-availability"
          className="min-w-35 w-3/6 flex items-center justify-between"
        >
          <p id="serve-unit">
            <span id="food-serve-quantity">{servingQuantity}</span>{" "}
            <span id="food-unit">{unit}</span>
          </p>
          {available ? (
            <span
              id="food-availbility"
              className="text-sm font-bold text-green-700"
            >
              <span className="text-lg mr-0.5">&#183;</span>Available
            </span>
          ) : (
            <span
              id="food-availbility"
              className="text-sm font-bold text-red-700"
            >
              <span className="text-lg mr-0.5">&#183;</span>Unavailable
            </span>
          )}
        </div>
        <div className="flex gap-3 items-center">
          <div className="text-md font-bold">₹{defaultPrice}</div>
          <div className="flex gap-0.5">
            <Star size={12} fill="black" />
            <Star size={12} fill="black" />
            <Star size={12} fill="black" />
            <Star size={12} fill="black" />
            <Star size={12} />
          </div>
        </div>

        <div className="mt-1 flex justify-around items-center ">
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
            className="flex items-center text-sm font-medium bg-zinc-800 text-white p-1 px-2 rounded-lg cursor-pointer select-none"
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
