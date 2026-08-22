import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HorizontalRounded = ({
  id,
  image,
  name,
  servingQuantity,
  unit,
  price,
  available,
}) => {
  // Upgraded to slightly deeper, vivid and rich modern color variants
  const [colorClass, setColorClass] = useState({
    bg: "bg-zinc-100 border-zinc-200",
    text: "text-zinc-900",
    muted: "text-zinc-600",
    starFill: "#eab308",
    starStroke: "#eab308"
  });

  const colorVariants = [
    { bg: "bg-emerald-100 border-emerald-200", text: "text-emerald-950", muted: "text-emerald-800", starFill: "#047857", starStroke: "#047857" },
    { bg: "bg-rose-100 border-rose-200", text: "text-rose-950", muted: "text-rose-800", starFill: "#e11d48", starStroke: "#e11d48" },
    { bg: "bg-zinc-100 border-zinc-200", text: "text-zinc-900", muted: "text-zinc-600", starFill: "#eab308", starStroke: "#d4d4d8" },
    { bg: "bg-amber-100 border-amber-200", text: "text-amber-950", muted: "text-amber-800", starFill: "#b45309", starStroke: "#b45309" },
    { bg: "bg-orange-100 border-orange-200", text: "text-orange-950", muted: "text-orange-800", starFill: "#ea580c", starStroke: "#ea580c" },
    { bg: "bg-sky-100 border-sky-200", text: "text-sky-950", muted: "text-sky-800", starFill: "#0284c7", starStroke: "#0284c7" }
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * colorVariants.length);
    setColorClass(colorVariants[randomIndex]);
  }, []);

  return (
    <Link
      to={`/meal/${id}`}
      className={`group relative w-auto h-36 flex justify-between items-center gap-4 p-2 rounded-full border shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all duration-300 ease-out z-0 ${colorClass.bg}`}
    >
      {/* Left Side: Food Circle Image Container */}
      <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden border-2 border-white shadow-md bg-zinc-200 relative z-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Right Side: Food Info & Content Tiers */}
      <div className={`flex-1 pr-5 flex flex-col justify-center min-w-0 z-0 ${colorClass.text}`}>
        {/* Title */}
        <p className="text-base font-bold tracking-tight truncate group-hover:opacity-80 transition-opacity">
          {name}
        </p>
        
        {/* Serving Unit Specifier */}
        <p className={`text-xs font-bold mt-0.5 tracking-wide ${colorClass.muted}`}>
          {servingQuantity} {unit}
        </p>
        
        {/* Financials & Clean Status Indicators */}
        <div className="w-full flex items-center justify-between font-bold text-sm mt-1.5 z-0">
          <p className="text-[15px] font-extrabold tracking-tight">₹{price}</p>
          
          {available ? (
            <p className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-white/60 px-2 py-0.5 rounded-full border border-emerald-200/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Available</span>
            </p>
          ) : (
            <p className="inline-flex items-center gap-1 text-xs font-extrabold text-rose-700 bg-white/60 px-2 py-0.5 rounded-full border border-rose-200/40">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span>Unavailable</span>
            </p>
          )}
        </div>
        
        {/* Tightly-Packed Star Rating Blocks */}
        <div className="flex gap-0 mt-1.5 items-center z-0">
          <Star size={13} fill={colorClass.starFill} color={colorClass.starStroke || "currentColor"} strokeWidth={0.5} />
          <Star size={13} fill={colorClass.starFill} color={colorClass.starStroke || "currentColor"} strokeWidth={0.5} />
          <Star size={13} fill={colorClass.starFill} color={colorClass.starStroke || "currentColor"} strokeWidth={0.5} />
          <Star size={13} fill={colorClass.starFill} color={colorClass.starStroke || "currentColor"} strokeWidth={0.5} />
          <Star size={13} stroke="currentColor" className="text-zinc-400" strokeWidth={2} />
        </div>
      </div>
    </Link>
  );
};

export default HorizontalRounded;
