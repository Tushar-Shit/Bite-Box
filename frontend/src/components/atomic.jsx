import React from "react";
import { ChevronRight } from "lucide-react";
const SeeMore = () => {
  return (
    <div className="w-full flex justify-center">
      <b>
        <div className="flex bg-zinc-200 text-red-500 p-1 px-2 items-center justify-center rounded-lg text-lg">
          seemore <ChevronRight size={16} />
        </div>
      </b>
    </div>
  );
};

export { SeeMore };
