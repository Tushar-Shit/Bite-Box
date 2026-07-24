import { useState, useEffect } from "react";
import { Heartclick } from "../atomic/atomic";
import { Link } from "react-router-dom";
const SquareFC = ({
  id,
  image,
  name,
  servingQuantity,
  quantity,
  price,
  category,
  unit,
  isFav,
  satisfymessage,
  description,
}) => {
  //set heart icon state
  const [fav, setFav] = useState(isFav);
  useEffect(() => {
    setFav(isFav);
  }, [isFav]);
  //set UI icons when user not logged in
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user !== false) return;
    let preFav = JSON.parse(sessionStorage.getItem("fav")) || [];
    const exist = preFav.some((item) => item._id === id);
    if (exist) setFav(true);
  }, []);

  //handle favourite (add, remove)
  const handle = async (e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    if (!id) return;

    //if user not logged in
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user === false) {
      let preFav = JSON.parse(sessionStorage.getItem("fav")) || [];
      const index = preFav.findIndex((item) => item._id === id);
      if (index === -1) {
        preFav.push({
          _id: id,
          image: image,
          name: name,
          description: description,
          price: price,
          unit: unit,
          quantity: quantity,
        });
        satisfymessage("item added");
        setFav((prev) => !prev);
      } else {
        preFav.splice(index, 1);
        satisfymessage("item removed");
        setFav((prev) => !prev);
      }
      sessionStorage.setItem("fav", JSON.stringify(preFav));
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/addfav`,
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Link
      to={`/meal/${id}`}
      className="shrink-0 w-[45%] h-55 shadow-[2px_2px_5px_rgba(0,0,0,0.4)] rounded-lg relative"
    >
      <div className="bg-zinc-50 rounded-full p-1 w-7 h-7 absolute right-1 top-1 flex items-center">
        <Heartclick onClick={handle} isFav={fav} />
      </div>

      <div className="h-[60%]">
        <img
          src={image}
          alt={name}
          className=" h-full w-full object-cover rounded-t-md"
        />
      </div>
      <div className="flex flex-col p-2 pl-3 text-md">
        <p className="font-bold truncate">{name}</p>
        <p className="">
          {servingQuantity} {unit}
        </p>
        <div className="flex justify-between">
          <p className="font-bold ">₹{price}</p>
          <span className="mr-3">🔥 4.3</span>
        </div>
      </div>
    </Link>
  );
};

export default SquareFC;
