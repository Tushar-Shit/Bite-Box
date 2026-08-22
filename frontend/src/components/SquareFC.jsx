import { useState, useEffect, useContext } from "react";
import AllCount from "../context/allCount";
import { Heartclick } from "../atomic/atomic";
import { Link } from "react-router-dom";

const SquareFC = ({
  id,
  image,
  name,
  description,
  servingQuantity,
  quantity,
  price,
  unit,
  isFav,
  available,
  satisfymessage,
}) => {
  const { user, setUser, favCount, setFavCount } = useContext(AllCount);
  const [fav, setFav] = useState(isFav);

  useEffect(() => {
    setFav(isFav);
  }, [isFav]);

  const handle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id) return;

    // Guest user favourite food updation
    if (!user || !user.userName) {
      let preFav = JSON.parse(sessionStorage.getItem("fav")) || [];
      const index = preFav.findIndex((item) => item._id === id);
      if (index === -1) {
        preFav.push({
          _id: id,
          image,
          name,
          description,
          price,
          unit,
          quantity,
          available,
        });

        satisfymessage("item added");
        setFav(true);
      } else {
        preFav.splice(index, 1);
        satisfymessage("item removed");
        setFav(false);
      }

      sessionStorage.setItem("fav", JSON.stringify(preFav));
      setFavCount(preFav.length);
      return;
    }

    // Logged in user store food items
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/update/favourite`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            foodId: id,
          }),
        },
      );

      const { message } = await response.json();
      satisfymessage(message);
      setFav((prev) => !prev);

      // Fetch latest favourite count
      const favRes = await fetch(
        `${import.meta.env.VITE_API_URL}/update/favourite`,
        {
          credentials: "include",
        },
      );
      const { favourites } = await favRes.json();
      setFavCount(favourites ? favourites.length : 0);
    } catch (err) {
      console.log(err);
    }
  };

return (
  <Link
    to={`/meal/${id}`}
    className="group relative shrink-0 w-[45%] max-w-47 h-56 flex flex-col justify-between bg-white border border-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.16)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.40)] hover:-translate-y-1 rounded-2xl overflow-hidden transition-all duration-300 ease-out z-0"
  >
    {/* Floating Favorite Button - Kept Top Right */}
    <div className="absolute right-2 top-2 z-10 bg-white/80 backdrop-blur-md rounded-xl p-1.5 w-8 h-8 flex items-center justify-center shadow-sm border border-zinc-200/40 ">
      <Heartclick onClick={handle} isFav={fav} />
    </div>

    {/* Food Image Container */}
    <div className="h-[55%] overflow-hidden bg-zinc-50 relative z-0">
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
      />
    </div>

    {/* Food Details Content - Zero vertical padding/margins */}
    <div className="flex flex-col flex-1 px-3 py-0 justify-around relative z-0">
      {/* Title Section - Scaled up text */}
      <div className="z-0 p-0 m-0">
        <p className="font-bold text-base text-zinc-900 tracking-tight truncate group-hover:text-amber-600 transition-colors duration-200">
          {name}
        </p>
      </div>

      {/* Portion Info & Status Metrics Row - Zero vertical spacing */}
      <div className="w-full flex items-center justify-between gap-1.5 p-0 m-0 relative z-0">
        {/* Scaled up Quantity Display */}
        <p className="text-xs text-zinc-600 font-semibold tracking-wide whitespace-nowrap">
          <span className="font-extrabold text-zinc-800">{servingQuantity}</span>{" "}
          <span className="text-zinc-700">{unit}</span>
        </p>

        {/* Scaled up Dynamic Status Pill */}
        {available ? (
          <p className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/30 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Available</span>
          </p>
        ) : (
          <p className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-xs font-bold bg-rose-50 text-rose-500 border border-rose-100/30 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            <span>Unavailable</span>
          </p>
        )}
      </div>

      {/* Financials & Rating Footer - Scaled up text, zero vertical padding */}
      <div className="flex justify-between items-center p-0 m-0 border-t border-zinc-100/80 z-0">
        <p className="text-base font-extrabold text-zinc-900 tracking-tight">₹{price}</p>
        <span className="inline-flex items-center gap-0.5 text-xs font-bold text-amber-700 bg-amber-50/60 px-1.5 py-0.5 rounded-md border border-amber-100/30">
          🔥 4.3
        </span>
      </div>
    </div>
  </Link>
);



};

export default SquareFC;
