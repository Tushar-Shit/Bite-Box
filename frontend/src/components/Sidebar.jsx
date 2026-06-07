import { Link } from "react-router-dom";
import {
  Calendar,
  ChevronRight,
  LogOut,
  CreditCard,
  MapPin,
  Heart,
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
  return (
    <>
    <div
      className={`fixed top-0 left-0 z-50 flex h-full w-full items-center justify-start bg-black/70 backdrop-blur-md transition-opacity duration-700 ${showSide ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      {/* Sidebar Container */}
      <div
        className={`relative flex h-full w-[85%] flex-col  bg-white text-black transition-transform duration-700 ease-in-out ${showSide ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-[16%] w-full bg-rose-600 px-5">
          <div className="flex items-center justify-between mt-8 text-white">
            <p className="text-2xl font-bold">View Details</p>
            <span onClick={onClick} className="text-4xl">
              &times;
            </span>
          </div>
        </div>
        <div className="h-[12%] w-[90%] absolute top-[10%] left-[5%] bg-white flex gap-3 items-center p-3 rounded-md">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHCBu2asBmYHBPRvht-u5d_alNH19z7VhL-w&s"
            alt=""
            className="h-20 w-20 rounded-full border"
          />
          <div>
            <p className="text-xl font-bold">Narendra Modi</p>
            <p className="font-semibold">modi.india@gmail.com</p>
          </div>
        </div>

        <div className="h-[88%] w-full bg-orange-100 py-17">
          <div className="flex items-center gap-2 px-10 border-b">
            <Calendar className="w-[10%] " />
            <SidebarSupport title="Order History" />
          </div>
          <div className="flex items-center gap-2 px-10 border-b">
            <CreditCard className="w-[10%] " />
            <SidebarSupport title="Payment Method" />
          </div>
          <div className="flex items-center gap-2 px-10 border-b">
            <MapPin className="w-[10%] " />
            <SidebarSupport title="My Address" />
          </div>
          <Link
            to="/favorite"
            className="flex items-center gap-2 px-10 border-b"
          >
            <Heart className="w-[10%] " />
            <SidebarSupport title="Favorites" />
          </Link>
          <div className="flex items-center gap-2 px-10 border-b">
            <LogOut className="w-[10%] " />
            <SidebarSupport title="Log Out" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export { SidebarSupport };
export default Sidebar;
