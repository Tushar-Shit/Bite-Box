import { Minus, Plus, Trash2, Star } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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
  const { favCount, setFavCount, cartCount, setCartCount, user, setUser } =
    useContext(AllCount);

  //master function for add and delete in both session, DB
  const masterFunc = async (e, commandVal) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id) return;

    if (!user || !user.userName) {
      let sessionCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const existItem = sessionCart.find((item) => item._id === id);
      if (existItem) {
        commandVal === "increase" &&
          (existItem.quantity++, satisfymessage("item increased"));

        commandVal === "decrease" &&
          ((existItem.quantity = Math.max(1, existItem.quantity - 1)),
          satisfymessage("item decreased"));

        commandVal === "add/dlt" &&
          ((sessionCart = sessionCart.filter((item) => item._id !== id)),
          satisfymessage("Item Removed"));
      }
      sessionStorage.setItem("cart", JSON.stringify(sessionCart));
      setCartCount(sessionCart.length);
      return;
    }

    try {
      if (commandVal === "increase" || commandVal === "decrease") {
        const updateRes = await fetch(
          `${import.meta.env.VITE_API_URL}/update/cart`,
          {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              foodId: id,
              originalPrice: defaultPrice,
              command: commandVal, //increase & decrease
            }),
          },
        );
        const data = await updateRes.json();
        if (data.code === "success") {
          satisfymessage(data.message);
        }
        return;
      }
      const res = await fetch(`${import.meta.env.VITE_API_URL}/update/cart`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [{ id: id, quantity: quantity, available: available }],
          command: commandVal, //add/dlt, increase, decrease
        }),
      });
      const { message } = await res.json();
      satisfymessage(message);

      //count cart length
      const cartRes = await fetch(
        `${import.meta.env.VITE_API_URL}/update/cart`,
        {
          credentials: "include",
        },
      );
      const totalCart = await cartRes.json();
      setCartCount(totalCart.length);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Link
      to={`/meal/${id}`}
      className="group relative w-full h-40 p-3 bg-white hover:bg-zinc-50/40 border border-zinc-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] flex items-center justify-between gap-4 rounded-2xl transition-all duration-300 ease-out z-0"
    >
      {/* Left Side: Food Image Container (Expanded by 5% to 40% to fill void space) */}
      <div className="h-full w-[40%] shrink-0 overflow-hidden rounded-xl bg-zinc-50 relative z-0">
        <img
          src={image}
          alt={name}
          className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Right Side: Food Details & Controls Container */}
      <div className="flex-1 h-full flex flex-col justify-between py-1 relative z-0">
        {/* Top Section: Slightly Enhanced Title & Status Attributes */}
        <div className="z-0">
          <div className="w-11/12 text-[17px] font-bold text-zinc-900 tracking-tight leading-snug truncate group-hover:text-amber-600 transition-colors duration-200">
            {name}
          </div>

          {/* Quantity and Availability Metrics Row (Completely flat bg-less items) */}
          <div
            id="serve-quantity-availability"
            className="flex items-center gap-2.5 mt-1 relative z-0"
          >
            <p
              id="serve-unit"
              className="text-[11px] text-zinc-500 font-medium tracking-wide"
            >
              Portion:{" "}
              <span
                id="food-serve-quantity"
                className="font-bold text-zinc-800"
              >
                {servingQuantity}
              </span>{" "}
              <span id="food-unit" className="text-zinc-600">
                {unit}
              </span>
            </p>

            <span className="text-zinc-300 text-[10px]">|</span>

            {available ? (
              <span
                id="food-availbility"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Available
              </span>
            ) : (
              <span
                id="food-availbility"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-500"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                Unavailable
              </span>
            )}
          </div>
        </div>

        {/* Middle Section: Price & Stars Kept Ultra-Close (Left Aligned Flow) */}
        <div className="flex items-center gap-2.5 z-0">
          <div className="text-lg font-extrabold text-zinc-900 tracking-tight">
            ₹{defaultPrice}
          </div>
          <div className="flex gap-0 text-amber-400 bg-amber-50/50 px-1 py-0.5 rounded-md border border-amber-100/30">
            <Star size={11} fill="currentColor" stroke="currentColor" />
            <Star size={11} fill="currentColor" stroke="currentColor" />
            <Star size={11} fill="currentColor" stroke="currentColor" />
            <Star size={11} fill="currentColor" stroke="currentColor" />
            <Star size={11} stroke="currentColor" className="text-zinc-200" />
          </div>
        </div>

        {/* Bottom Section: Clean Controller Panel & Strong Delete Button */}
        <div className="flex items-center justify-between gap-2 relative z-0">
          {/* Modernized Borderless Controller Component */}
          <div className="flex items-center p-0.5 z-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (foodUnit <= 1) return;
                masterFunc(e, "decrease");
              }}
              className="w-7 h-7 bg-zinc-100 hover:bg-rose-50 hover:text-rose-600 text-zinc-600 rounded-lg border-none cursor-pointer flex items-center justify-center transition-all duration-150 active:scale-90"
            >
              <Minus size={12} strokeWidth={3} />
            </button>

            <div className="font-bold text-sm text-zinc-900 mx-2.5 min-w-4 text-center tabular-nums">
              {foodUnit}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                masterFunc(e, "increase");
              }}
              className="w-7 h-7 bg-zinc-100 hover:bg-emerald-50 hover:text-emerald-600 text-zinc-600 rounded-lg border-none cursor-pointer flex items-center justify-center transition-all duration-150 active:scale-90"
            >
              <Plus size={12} strokeWidth={3} />
            </button>
          </div>

          {/* Action Button: Strong Text Delete Trigger */}
          <button
            className="inline-flex items-center gap-1.5 text-xs font-black bg-rose-50 hover:bg-rose-100/80 text-rose-700 p-2 px-3.5 rounded-xl cursor-pointer select-none transition-all duration-200 border border-rose-200/30 active:scale-95 shadow-sm z-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              masterFunc(e, "add/dlt");
            }}
          >
            <Trash2 size={13} strokeWidth={2.5} />
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CartCard;
