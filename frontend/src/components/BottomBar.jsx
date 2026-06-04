import {
  Heart,
  House,
  Blocks,
  NotebookPen,
} from "lucide-react";

const BottomBar = () => {
  return (
    <div className="bg-zinc-100 w-full flex justify-around items-center fixed bottom-0 p-3 shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
      <div className="flex flex-col items-center">
        <House strokeWidth={1.5} />
        <span>Home</span>
      </div>
      <div className="flex flex-col items-center">
        <Blocks strokeWidth={1.5} />
        Categories
      </div>
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
