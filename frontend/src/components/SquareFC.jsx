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
      className="shrink-0 w-[45%] max-w-47 h-55 shadow-[2px_2px_5px_rgba(0,0,0,0.4)] rounded-lg relative"
    >
      <div className="bg-zinc-50 rounded-full p-1 w-7 h-7 absolute right-1 top-1 flex items-center">
        <Heartclick onClick={handle} isFav={fav} />
      </div>

      <div className="h-[60%]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover rounded-t-md"
        />
      </div>

      <div className="flex flex-col p-2 pl-3 text-md">
        <p className="font-bold truncate">{name}</p>

        <div className="w-full flex items-center justify-between pr-2">
          <p>
            {servingQuantity} {unit}
          </p>

          {available ? (
            <p className="text-green-700 text-sm font-bold">
              <span>Available</span>
            </p>
          ) : (
            <p className="text-red-700 text-sm font-bold">
              <span>Unavailable</span>
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <p className="font-bold">₹{price}</p>
          <span className="mr-3">🔥 4.3</span>
        </div>
      </div>
    </Link>
  );
};

export default SquareFC;
