import { useContext } from "react";
import AllCount from "../context/allCount";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  KeyRound,
  NotebookPen,
  LogOut,
  ChevronRight,
} from "lucide-react";

function SidebarSupport({ title }) {
  return <div className="py-4">{title}</div>;
}

function Sidebar() {
  const { user, setUser } = useContext(AllCount);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setUser(null);

      // Close sidebar by going back to Home
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const closeSidebar = () => {
    navigate("/");
  };

return (
  <div className="fixed inset-0 z-99">
    {/* Background */}
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeSidebar} />

    {/* Sidebar */}
    <div className="relative flex h-full w-[85%] sm:max-w-[50%] md:max-w-[40%] lg:max-w-[30%] flex-col overflow-hidden bg-[#fff8f1] text-zinc-800 shadow-[5px_0_20px_rgba(0,0,0,0.2)]">

      {/* Header */}
      <div className="bg-linear-to-r from-red-600 to-orange-500 px-6 py-5 text-white shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-orange-100">BiteBox</p>
            <h2 className="text-xl font-bold">My Profile</h2>
          </div>

          <button type="button" onClick={closeSidebar} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-2xl transition hover:bg-white/25 cursor-pointer">
            ×
          </button>
        </div>
      </div>

      {/* User */}
      {user?.userName && (
        <div className="border-b border-orange-100 bg-orange-50 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white shadow-sm">
              {user.userName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate font-bold text-zinc-800">{user.userName}</p>
              <p className="truncate text-sm text-zinc-500">{user.userEmail}</p>
            </div>
          </div>

          <Link to="/userinfo" state={user.userEmail} className="mt-4 inline-block rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600">
            See Details
          </Link>
        </div>
      )}

      {/* Menu */}
      <div className="flex-1 px-4 py-5">

        <Link to="/help" state="ce" className="group mb-2 flex items-center gap-4 rounded-xl bg-white px-4 py-3 shadow-sm transition hover:bg-orange-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
            <Mail className="h-5 w-5" />
          </div>

          <span className="flex-1 font-medium">Change Email</span>

          <ChevronRight className="h-5 w-5 text-zinc-400 transition group-hover:translate-x-1 group-hover:text-orange-500" />
        </Link>

        <Link to="/help" state="cp" className="group mb-2 flex items-center gap-4 rounded-xl bg-white px-4 py-3 shadow-sm transition hover:bg-yellow-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
            <KeyRound className="h-5 w-5" />
          </div>

          <span className="flex-1 font-medium">Change Password</span>

          <ChevronRight className="h-5 w-5 text-zinc-400 transition group-hover:translate-x-1 group-hover:text-yellow-600" />
        </Link>

        <Link to="/orders" className="group mb-2 flex items-center gap-4 rounded-xl bg-white px-4 py-3 shadow-sm transition hover:bg-red-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
            <NotebookPen className="h-5 w-5" />
          </div>

          <span className="flex-1 font-medium">Order History</span>

          <ChevronRight className="h-5 w-5 text-zinc-400 transition group-hover:translate-x-1 group-hover:text-red-500" />
        </Link>

        {/* Logout */}
        {user?.userName && (
          <button type="button" onClick={logout} className="group mt-4 flex w-full items-center gap-4 rounded-xl bg-red-50 px-4 py-3 text-left transition hover:bg-red-100 cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-500">
              <LogOut className="h-5 w-5" />
            </div>

            <span className="flex-1 font-medium text-red-600">Log Out</span>

            <ChevronRight className="h-5 w-5 text-red-300 transition group-hover:translate-x-1 group-hover:text-red-500" />
          </button>
        )}

        {/* Guest */}
        {!user?.userName && (
          <Link to="/login" className="mt-4 flex items-center justify-center rounded-xl bg-linear-to-r from-red-600 to-orange-500 px-4 py-3 font-semibold text-white shadow-md transition hover:from-red-700 hover:to-orange-600">
            Login
          </Link>
        )}
      </div>
    </div>
  </div>
);
}

export { SidebarSupport };
export default Sidebar;
