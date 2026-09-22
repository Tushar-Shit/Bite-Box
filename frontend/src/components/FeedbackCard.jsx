import React, { useState } from "react";
import { Star } from "lucide-react";

const FeedbackCard = ({ name, text, star }) => {
  const color = {
    1: "#ff5e5e",
    2: "#fb9c70",
    3: "#fbc870",
    4: "#aefb70",
    5: "#5cf85f",
  };
  const totalStar = [1, 2, 3, 4, 5];
  return (
    <div
      className="bg-zinc-100 border-[#808080] mx-4 p-2 rounded-xl lg:mb-2"
      // style={{ backgroundColor: color[star] }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="pl-3 flex gap-2 items-center">
          <div className="h-10 w-10 border rounded-full"></div>
          <p className="text-lg font-bold">{name}</p>
        </div>
        <div className="flex gap-0.5 pr-1">
          {totalStar.map((index) => (
            <Star
              size={15}
              fill={`${index <= star ? "#ff9d00" : "#9b9b9b"}`}
              color={`${index <= star ? "#ff9d00" : "#9b9b9b"}`}
            />
          ))}
        </div>
      </div>
      <div className="text-justify text-sm w-[75vw]">{text}</div>
    </div>
  );
};

export default FeedbackCard;
