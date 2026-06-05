import { Heart, House, Blocks, NotebookPen, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
const BottomBar = () => {
  return (
    <div className="bg-zinc-100 w-full flex justify-around items-center fixed bottom-0 p-3 shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
      <Link to="/" className="flex flex-col items-center">
        <House strokeWidth={1.5} />
        <span>Home</span>
      </Link>
      <Link to="/categories" className="flex flex-col items-center">
        <Blocks strokeWidth={1.5} />
        Categories
      </Link>
      <Link to="/orders" className="flex flex-col items-center">
        <NotebookPen strokeWidth={1.5} />
        Orders
      </Link>
      <Link to="/favorite" className="flex flex-col items-center">
        <Heart strokeWidth={1.5} />
        Favorites
      </Link>
    </div>
  );
};

export default BottomBar;

const BottomActionBar = ({ price }) => {
  console.log(price);
  return (
    <div className="flex justify-around py-4 items-center rounded-t-lg bg-zinc-300">
      <div className="w-[40%] flex gap-2 py-2 rounded-lg justify-center text-lg bg-zinc-50">
        <ShoppingBag /> Add to Cart
      </div>
      <div className="w-[40%] flex py-2 rounded-lg justify-center gap-2 text-lg font-bold bg-amber-500">
        Buy at <span>₹{price}</span>
      </div>
    </div>
  );
};

export { BottomActionBar };
