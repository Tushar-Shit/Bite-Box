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
  Menu,
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
  let visibleName;
  if (user.username) {
    visibleName = user.username.split(" ");
  }
  return (
    <div className="flex justify-between items-center px-4 w-full h-16 bg-red-500 py-3">
      <div className="flex gap-2 items-center">
      <Menu  />
      <p className="text-lg font-bold">BiteBox</p>
      </div>
      {user.username ? (
        <>
          <div className="flex flex-col items-center cursor-pointer" onClick={onClick}>
            <UserRound
              strokeWidth={1.5}              
              className="border rounded-full w-7 h-7"
            />
            <p className="text-sm font-medium">{visibleName[0]}</p>
          </div>
        </>
      ) : (
        <div className="flex gap-3 text-white font-semibold text-md">
          <span>
            <Link to="/signup">SignUp</Link>
          </span>
          <span>
            <Link to="/login">Login</Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default Navbar;