import { UserRound, Menu } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onClick }) => {
  // check user logged in or not and get username
  const user = JSON.parse(sessionStorage.getItem("user")) || null;
  const [name, setName] = useState(null);
  useEffect(() => {
    if (user) {
      const username = sessionStorage.getItem("username") || null;
      if (username) setName(username.split(" ")[0]);
    }
  }, []);

  return (
    <div className="flex justify-between items-center px-4 w-full h-16 bg-red-500 py-3">
      <div className="flex gap-2 items-center">
        <Menu />
        <p className="text-lg font-bold">BiteBox</p>
      </div>
      {user ? (
        <>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={onClick}
          >
            <UserRound
              strokeWidth={1.5}
              className="border rounded-full w-7 h-7"
            />
            <p className="text-sm font-medium">{name}</p>
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
