import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AllCount from "../context/allCount";
const HorizontalFC = ({
  id,
  image,
  name,
  description,
  servingQuantity,
  quantity,
  price,
  unit,
  isFav,
  available,
  satisfymessage,
  //design purpose
  view,
}) => {

return (
  <Link
    to={`/meal/${id}`}
    className={`group relative flex gap-4 items-center shrink-0 w-full h-40 p-3 mb-4 rounded-2xl bg-white border border-zinc-100 shadow-[0_4px_8px_rgb(0,0,0,0.16)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-300 ease-out
      ${view === "list" ? "sm:min-w-72 sm:grow sm:basis-0 sm:m-0 sm:max-w-90" : "sm:min-w-73 sm:grow sm:basis-0 sm:m-0"}
      ${view === "list" ? "md:max-lg:min-w-87 md:max-lg:max-w-120" : "md:max-lg:min-w-87"}
      ${view === "list" ? "lg:max-2xl:min-w-75 lg:max-2xl:max-w-100" : "lg:max-xl:min-w-90"}
      ${view === "list" ? "2xl:min-w-100 2xl:max-w-122" : "2xl:max-w-100"}`}
  >
    {/* food image */}
    <div className="relative flex-2 h-full overflow-hidden rounded-xl bg-zinc-50">
      <img
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        src={image}
        alt=""
      />
    </div>

    {/* food name & content details */}
    <div className="flex-3 flex flex-col justify-between h-full py-0.5 pr-1">
      <div>
        <div className="w-11/12 text-base font-bold text-zinc-900 tracking-tight truncate group-hover:text-amber-500 transition-colors duration-200">
          {name}
        </div>

        {/* short description */}
        <div id="short-descrip" className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
          {description}
        </div>
      </div>

      {/* Bottom Layout Stack */}
      <div className="space-y-2">
        {/* serving quantity & unit row */}
        <div
          id="serve-quantity-availability"
          className="flex items-center justify-between gap-2 relative z-10"
        >
          <p id="serve-unit" className="bg-amber-50/65 text-[11px] px-2.5 py-1 rounded-lg border border-amber-100/50 text-amber-900 font-medium tracking-tight">
            <span id="food-serve-quantity" className="font-extrabold text-amber-700">{servingQuantity}</span>{" "}
            <span id="food-unit" className="text-amber-800 font-semibold">{unit}</span>
          </p>
          
          {available ? (
            <span
              id="food-availbility"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Available
            </span>
          ) : (
            <span
              id="food-availbility"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/50"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              Unavailable
            </span>
          )}
        </div>

        {/* price & rating row */}
        <div className="w-full flex justify-between items-center relative">
          <div className="flex items-baseline gap-2">
            <span id="price" className="text-lg font-extrabold text-zinc-900 tracking-tight">
              ₹{price}
            </span>
            <span id="rating" className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-bold text-amber-700 bg-amber-50/60 rounded-md border border-amber-100/20">
              🔥4.3
            </span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);


};

export default HorizontalFC;
