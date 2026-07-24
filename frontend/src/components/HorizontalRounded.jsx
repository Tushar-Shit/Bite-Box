import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const HorizontalRounded = ({
  id,
  image,
  name,
  servingQuantity,
  quantity,
  unit,
  price,
  isFav,
}) => {
   const [colorClass, setColorClass] = useState({
    bg: "bg-red-300",
    text: "text-white",
  });
  const colorVariants = [
    { bg: "bg-lime-400", text: "black" },
    { bg: "bg-red-600", text: "black" },
    { bg: "bg-black", text: "white" },
    { bg: "bg-yellow-300", text: "black" },
    { bg: "bg-orange-400", text: "black" },
    { bg: "bg-green-500", text: "black" },
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * colorVariants.length);
    setColorClass(colorVariants[randomIndex]);
  }, []);
  return (
    <Link
      to={`/meal/${id}`}
      className={`w-auto h-35 flex justify-between items-center gap-2 p-2 rounded-full ${colorClass.bg}`}
    >
      <div className="w-30 h-full rounded-full">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <div className={`w-45 pr-2  text-${colorClass.text}`}>
        <p className="text-lg font-bold">{name}</p>
        <p>
          {servingQuantity} {unit}
        </p>
        <p className="font-bold">₹{price}</p>
        <p className="flex gap-0.5">
          <Star size={20} fill={colorClass.text} color={colorClass.text} strokeWidth={0.5} />
          <Star size={20} fill={colorClass.text} color={colorClass.text} strokeWidth={0.5} />
          <Star size={20} fill={colorClass.text} color={colorClass.text} strokeWidth={0.5} />
          <Star size={20} fill={colorClass.text} color={colorClass.text} strokeWidth={0.5} />
          <Star size={20} />
        </p>
      </div>
    </Link>
  );
};

export default HorizontalRounded;
