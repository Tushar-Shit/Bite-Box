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
      <div className="flex flex-col items-center">
        <NotebookPen strokeWidth={1.5} />
        Orders
      </div>
      <div className="flex flex-col items-center">
        <Heart strokeWidth={1.5} />
        Favorites
      </div>
    </div>
  );
};

export default BottomBar;

const BottomActionBar = () => {
  return (
    <div className="flex border justify-center py-2">
      <div className="flex-2/5 border">hello</div>
      <div className=" flex gap-2 flex-2/5 py-2 rounded-lg justify-center bg-amber-500">
        <ShoppingBag /> Add to Cart
      </div>
    </div>
  );
};

export {BottomActionBar};