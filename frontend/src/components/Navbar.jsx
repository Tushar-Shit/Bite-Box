import React, { useState, useEffect, useContext } from "react";
import AllCount from "../context/allCount";
import { UserRound, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ onClick }) => {
  const { user, setUser } = useContext(AllCount);
  const [loggedin, setLoggedin] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    if (!user || !user.userName) {
      console.log("user not found");
      setLoggedin(false);
      return;
    }
    // console.log(user);
    setLoggedin(true);
    setName(user.userName.split(" ")[0]);
  }, [user]);

  return (
    <div className="flex justify-between items-center px-4 w-full h-16 bg-red-500 py-3">
      <div className="flex gap-2 items-center">
        <Menu />
        <p className="text-lg font-bold">BiteBox</p>
      </div>
      {loggedin ? (
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
