import {
  Heart,
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
import React, { useState, useEffect } from "react";
const ImageSlider = () => {
  const cardData = [
    { heroImage: "url1.jpg", text: "Card 1 Text" },
    { heroImage: "url2.jpg", text: "Card 2 Text" },
    { heroImage: "url3.jpg", text: "Card 3 Text" },
    { heroImage: "url4.jpg", text: "Card 4 Text" },
    { heroImage: "url5.jpg", text: "Card 5 Text" },
  ];
};

const Navbar = ({onClick}) => {
  // console.log(props);

  return (
    <nav className="bg-red-500  h-auto py-2">
      <div className="flex justify-between items-center px-4 w-0.5/5">
        <div className="flex gap-2 items-center cursor-pointer">
          <UserRound
            strokeWidth={1.5}
            onClick={onClick}
            className="border rounded-full w-10 h-10 p-1 cursor-pointer"
          />
          <span className="text-lg font-semibold">Tushar Shit</span>
        </div>
        <div className="flex gap-2 items-center justify-center relative  p-1">
          <ShoppingBag strokeWidth={1.5} className=" w-9 h-9 " />
          <span className="bg-zinc-100 text-red-600 font-bold px-1 py-0 text-xs rounded-full absolute right-0 top-0">
            1
          </span>
        </div>
      </div>
      <form className="my-1 m-auto self-center w-5/7 relative flex">
        <input
          type="text"
          placeholder="Search food..."
          className="border bg-white w-full rounded-l-md border-r-0 py-2 px-1 outline-none focus:outline-none"
        />
        <button className="border bg-white px-2 rounded-r-md">
          <Search />
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
