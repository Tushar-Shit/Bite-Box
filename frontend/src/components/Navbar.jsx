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
import { Link } from "react-router-dom";
const ImageSlider = () => {
  const cardData = [
    { heroImage: "url1.jpg", text: "Card 1 Text" },
    { heroImage: "url2.jpg", text: "Card 2 Text" },
    { heroImage: "url3.jpg", text: "Card 3 Text" },
    { heroImage: "url4.jpg", text: "Card 4 Text" },
    { heroImage: "url5.jpg", text: "Card 5 Text" },
  ];
};

const Navbar = ({ onClick, user }) => {
  console.log(user.username);
  console.log(user.email);

  return (
    <div className="flex justify-between items-center px-4 w-0.5/5 bg-red-500  h-auto py-5">
      <p className="text-lg font-bold">BiteBox</p>
      {user.username?
        (<div className="flex gap-2 items-center cursor-pointer">
          <UserRound
            strokeWidth={1.5}
            onClick={onClick}
            className="border rounded-full w-10 h-10 p-1 cursor-pointer"
          />
        </div>)
            :
        (<div className="flex gap-2 text-white font-semibold">
          <span>
            <Link to="/signup">SignUp</Link>
          </span>
          <span>
            <Link to="/login">Login</Link>
          </span>
        </div>)
}
    </div>
  );
};

export default Navbar;
