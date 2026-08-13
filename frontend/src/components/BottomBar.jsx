import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AllCount from "../context/allCount";
import {
  Heart,
  House,
  Blocks,
  ShoppingBag,
  ShoppingCart,
  Search,
} from "lucide-react";

const BottomBar = ({ update }) => {
  const { favCount, setFavCount, cartCount, setCartCount, user, setUser } =
    useContext(AllCount);

  const location = useLocation();

  useEffect(() => {
    // Guest user favourite & cart count
    if (!user || !user.userName) {
      const fav = JSON.parse(sessionStorage.getItem("fav")) || [];
      const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      setFavCount(fav.length);
      setCartCount(cart.length);
      return;
    }

    async function data() {
      try {
        const Cartdata = await fetch(
          `${import.meta.env.VITE_API_URL}/update/cart`,
          {
            credentials: "include",
          },
        );
        const Cartitems = await Cartdata.json();
        if (Cartitems.code === "ND" || Cartitems.length <= 0) setCartCount(0);
        else setCartCount(Cartitems.length);

        const Favdata = await fetch(
          `${import.meta.env.VITE_API_URL}/update/favourite`,
          {
            credentials: "include",
          },
        );
        const { favourites } = await Favdata.json();
        if (!favourites) setFavCount(0);
        else setFavCount(favourites.length);
      } catch (err) {
        console.error(err);
      }
    }

    data();
  }, [user, favCount, cartCount]);

  return (
    <div className="h-18 shrink-0 w-full shadow-[0_-4px_8px_rgba(0,0,0,0.25)] bg-white z-5">
      <div className="h-full w-full max-w-md mx-auto flex items-center justify-around px-3 bg-white/90 backdrop-blur-xl border-t border-zinc-100 shadow-[0_-8px_30px_rgba(0,0,0,0.02)] z-50">
        {/* Home Navigation Link */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center gap-0.5 text-xs font-bold tracking-tight w-14 h-14 rounded-xl transition-all duration-200 active:scale-90
      ${
        location.pathname.endsWith("/")
          ? "text-orange-500"
          : "text-slate-500 hover:text-slate-700"
      }`}
        >
          <House
            strokeWidth={location.pathname.endsWith("/") ? 2.2 : 1.5}
            size={24}
          />
          <span>Home</span>
        </Link>

        {/* Search Navigation Link */}
        <Link
          to="/search"
          className={`flex flex-col items-center justify-center gap-0.5 text-xs font-bold tracking-tight w-14 h-14 rounded-xl transition-all duration-200 active:scale-90
      ${
        location.pathname.startsWith("/search")
          ? "text-orange-500"
          : "text-slate-500 hover:text-slate-700"
      }`}
        >
          <Search
            strokeWidth={location.pathname.startsWith("/search") ? 2.2 : 1.5}
            size={24}
          />
          <span>Search</span>
        </Link>

        {/* Categories Navigation Link */}
        <Link
          to="/categories"
          className={`flex flex-col items-center justify-center gap-0.5 text-xs font-bold tracking-tight w-14 h-14 rounded-xl transition-all duration-200 active:scale-90
      ${
        location.pathname.startsWith("/categories")
          ? "text-orange-500"
          : "text-slate-500 hover:text-slate-700"
      }`}
        >
          <Blocks
            strokeWidth={
              location.pathname.startsWith("/categories") ? 2.2 : 1.5
            }
            size={24}
          />
          <span>Category</span>
        </Link>

        {/* Favourite Navigation Link */}
        <Link
          to="/favorite"
          className={`flex flex-col items-center justify-center gap-0.5 text-xs font-bold tracking-tight w-14 h-14 rounded-xl relative transition-all duration-200 active:scale-90
      ${
        location.pathname.startsWith("/favorite")
          ? "text-orange-500"
          : "text-slate-500 hover:text-slate-700"
      }`}
        >
          <div className="relative">
            <Heart
              strokeWidth={
                location.pathname.startsWith("/favorite") ? 2.2 : 1.5
              }
              size={24}
            />
            {favCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-black text-white ring-2 ring-white tabular-nums animate-in zoom-in-50 duration-200">
                {favCount}
              </span>
            )}
          </div>
          <span>Favourite</span>
        </Link>

        {/* Cart Navigation Link */}
        <Link
          to="/cart"
          className={`flex flex-col items-center justify-center gap-0.5 text-xs font-bold tracking-tight w-14 h-14 rounded-xl relative transition-all duration-200 active:scale-90
      ${
        location.pathname.startsWith("/cart")
          ? "text-orange-500"
          : "text-slate-500 hover:text-slate-700"
      }`}
        >
          <div className="relative">
            <ShoppingBag
              strokeWidth={location.pathname.startsWith("/cart") ? 2.2 : 1.5}
              size={24}
            />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-black text-white ring-2 ring-white tabular-nums animate-in zoom-in-50 duration-200">
                {cartCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomBar;

const BottomActionBar = ({ onClick, price, state }) => {
  return (
    <div className="flex justify-around py-4 items-center rounded-t-lg bg-zinc-300">
      {state ? (
        <div
          className="w-[40%] flex gap-2 py-2 rounded-lg justify-center text-lg bg-zinc-50 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick(e);
          }}
        >
          <ShoppingCart fill="black" /> Remove Item
        </div>
      ) : (
        <div
          className="w-[40%] flex gap-2 py-2 rounded-lg justify-center text-lg bg-zinc-50 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick(e);
          }}
        >
          <ShoppingCart /> Add to Cart
        </div>
      )}
      <div className="w-[40%] flex py-2 rounded-lg justify-center gap-2 text-lg font-bold bg-amber-500 cursor-pointer">
        Buy at <span>₹{price}</span>
      </div>
    </div>
  );
};

export { BottomActionBar };
