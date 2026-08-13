import React, { useState, useEffect, useContext } from "react";
import AllCount from "../context/allCount";
import { UserRound, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ onClick }) => {
  const { user } = useContext(AllCount);
  const [menu, setmenu] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user?.userName) {
      setLoggedin(false);
      setName("");
      setmenu(false);
      return;
    }
    setmenu(true);
    setLoggedin(true);
    setName(user.userName.split(" ")[0]);
  }, [user]);
  return (
    <nav className="flex h-16 w-full items-center justify-between bg-linear-to-r from-red-600 to-orange-500 px-4 text-white shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-3">
        {menu && (
          <button
            type="button"
            onClick={onClick}
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/15 active:scale-95"
          >
            <Menu className="h-6 w-6" strokeWidth={2} />
          </button>
        )}

        <Link to="/" className="text-xl font-extrabold tracking-tight">
          Bite<span className="text-yellow-300">Box</span>
        </Link>
      </div>

      {/* Right side */}
      {loggedin ? (
        <button
          type="button"
          onClick={onClick}
          className="flex items-center gap-2 rounded-full bg-white/15 px-2 py-1.5 backdrop-blur-sm transition hover:bg-white/25 active:scale-95"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-600">
            <UserRound className="h-5 w-5" strokeWidth={2} />
          </div>

          <span className="max-w-24 truncate pr-1 text-sm font-semibold">
            {name}
          </span>
        </button>
      ) : (
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Link
            to="/signup"
            className="rounded-full px-3 py-2 transition hover:bg-white/10"
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="rounded-full bg-white px-4 py-2 text-red-600 shadow-sm transition hover:bg-yellow-50 active:scale-95"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
