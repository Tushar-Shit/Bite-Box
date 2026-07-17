import {
  Heart,
  House,
  Blocks,
  NotebookPen,
  ShoppingBag,
  ShoppingCart,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const BottomBar = () => {
  const [cartCount, setCartCount] = useState(null);
  const [favCount, setFavCount] = useState(null);

  useEffect(() => {
    async function data() {
      const Cartdata = await fetch(
        `${import.meta.env.VITE_API_URL}/user/cart`,
        {
          credentials: "include",
        },
      );
      const Cartitems = await Cartdata.json();
      console.log(Cartitems.length);
      // if (Cartitems.length == 0) setCartCount(null);
      setCartCount(Cartitems.length);

      const Favdata = await fetch(
        `${import.meta.env.VITE_API_URL}/user/favourite`,
        {
          credentials: "include",
        },
      );
      const { favourites } = await Favdata.json();
      setFavCount(favourites.length);
    }
    data();
  }, [cartCount, favCount]);

  return (
    <div className="h-18">
      <div className="bg-zinc-100 w-full flex justify-evenly items-center fixed bottom-0 p-3 shadow-[0_3px_10px_rgba(0,0,0,0.9)] text-slate-500">
        <Link to="/" className="flex flex-col items-center">
          <House strokeWidth={1.5} />
          <span>Home</span>
        </Link>
        <Link to="/search" className="flex flex-col items-center">
          <Search strokeWidth={1.5} />
          Search
        </Link>
        <Link to="/categories" className="flex flex-col items-center">
          <Blocks strokeWidth={1.5} />
          Category
        </Link>
        <Link to="/favorite" className="flex flex-col items-center relative">
          <Heart strokeWidth={1.5} size={26} />
          <span> Favourite</span>
          <span className="absolute right-1.5 -top-1 rounded-full px-1 w-fit h-fit text-sm bg-red-600 text-white">
            {favCount}
          </span>
        </Link>
        <Link to="/cart" className="flex flex-col items-center relative">
          <ShoppingBag strokeWidth={1.5} />
          <span>Cart</span>
          {cartCount > 0 ? (
            <span className={`absolute -right-1.5 -top-1.5 rounded-full px-1 w-fit h-fit text-sm  bg-red-600 text-white`}>
              {cartCount}
            </span>
          ) : null}
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
          className="w-[40%] flex gap-2 py-2 rounded-lg justify-center text-lg bg-zinc-50"
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
          className="w-[40%] flex gap-2 py-2 rounded-lg justify-center text-lg bg-zinc-50"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick(e);
          }}
        >
          <ShoppingCart /> Add to Cart
        </div>
      )}
      <div className="w-[40%] flex py-2 rounded-lg justify-center gap-2 text-lg font-bold bg-amber-500">
        Buy at <span>₹{price}</span>
      </div>
    </div>
  );
};

export { BottomActionBar };
