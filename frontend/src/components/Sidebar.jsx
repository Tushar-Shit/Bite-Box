import { useState, useEffect, useContext } from "react";
import AllCount from "../context/allCount";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  ChevronRight,
  LogOut,
  KeyRound,
  NotebookPen,
} from "lucide-react";

function SidebarSupport({ title }) {
  return (
    <div className="w-[90%] flex justify-between items-center py-5">
      <p className="text-lg font-bold">{title}</p>
      <ChevronRight />
    </div>
  );
}

function Sidebar({ onClick, showSide }) {
  const { user, setUser } = useContext(AllCount);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.userName) {
      console.log("user not found");
      return;
    }
  }, [user]);

  const logout = async () => {
    try {
      const data = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "DELETE",
        credentials: "include",
      });

      setUser(null);
      onClick();
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 flex h-full w-full items-center justify-start bg-black/70 backdrop-blur-md transition-opacity duration-700 ${
        showSide
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={` border relative flex h-full w-[85%] sm:max-w-[50%] md:max-w-[40%] lg:max-w-[30%] flex-col text-black transition-transform duration-700 ease-in-out ${
          showSide ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="min-h-16 h-20 max-h-17.5 flex items-center justify-between text-white px-5 bg-rose-600">
          <p className="text-2xl font-bold">My Profile</p>
          <span onClick={onClick} className="text-4xl cursor-pointer">
            &times;
          </span>
        </div>
        <div className="h-full w-full bg-orange-100 ">
          {user.userName && (
            <div className="h-fit w-full bg-white flex gap-3 items-center px-3 py-4 rounded-tr-full shadow-[inset_-7px_9px_15px_0px_#9ca3af]">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHCBu2asBmYHBPRvht-u5d_alNH19z7VhL-w&s"
                alt=""
                className="h-20 w-20 rounded-full"
              />

              <div className="relative">
                <p className="text-md font-bold">{user.userName}</p>
                <p className="text-[14px] text-gray-500">{user.userEmail}</p>
                <Link
                  to="/userinfo"
                  state={`${user.userEmail}`}
                  className="bg-orange-600 p-1 rounded-md text-white text-sm absolute transition hover:ease-in-out hover:shadow-[2px_3px_10px_rgba(200,0,50,1)]"
                >
                  See Details
                </Link>
              </div>
            </div>
          )}

          <Link
            to="/help"
            state={"ce"}
            className="flex items-center gap-2 px-10 border-b"
          >
            <Mail className="w-[10%]" />
            <SidebarSupport title="Change Email" />
          </Link>

          <Link
            to="/help"
            state={"cp"}
            className="flex items-center gap-2 px-10 border-b"
          >
            <KeyRound className="w-[10%]" />
            <SidebarSupport title="Change Password" />
          </Link>

          <Link to="/orders" className="flex items-center gap-2 px-10 border-b">
            <NotebookPen className="w-[10%]" />
            <SidebarSupport title="Order History" />
          </Link>

          {user.userName && (
            <div
              className="flex items-center gap-2 px-10 border-b cursor-pointer"
              onClick={logout}
            >
              <LogOut className="w-[10%]" />
              <SidebarSupport title="Log Out" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { SidebarSupport };
export default Sidebar;
