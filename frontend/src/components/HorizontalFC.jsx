import { ShoppingCart, Search, UserRound, Component } from "lucide-react";
import { Heartclick } from "../atomic/atomic";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const HorizontalFC = ({
  name,
  quantity,
  price,
  image,
  description,
  unit,
  id,
  isFav,
}) => {
  //extract cart items
  const [inCart, setInCart] = useState(false);
  useEffect(() => {
    async function getCart() {
      const data = await fetch(`${import.meta.env.VITE_API_URL}/user/cart`, {
        credentials: "include",
      });
      const item = await data.json();
      if (item.some((i) => i.foodId._id === id)) setInCart(!inCart);
    }
    getCart();
  }, []);

  //handling favourite item(add, remove)
  const [fav, setFav] = useState(isFav);
  useEffect(() => {
    setFav(isFav);
  }, [isFav]);
  const handle = async (e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    if (!id) return;

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
      setFav((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  //handling cart item (add, remove)
  const addCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/cart`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FId: id,
          FQuantity: quantity,
          FPrice: price,
          command: "add/dlt", //command need for add and delete to separate updation
        }),
      });
      const { message } = await res.json();
      if (
        message.trim() === "Already in Cart" ||
        message.trim() === "Added to Cart"
      )
        setInCart(!inCart);
      // if (message.trim() === "Cart is Full") setInCart(!inCart);
      else setInCart(!inCart);
      console.log(message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Link
      to={`/meal/${id}`}
      className="bg-zinc-200 p-3 mb-3 h-40 flex  gap-3 items-center rounded-lg"
    >
      {/* food image  */}
      <div className="flex-2 h-full rounded-l-lg">
        <img
          className="w-full h-full object-cover rounded-l-lg"
          src={image}
          alt=""
        />
      </div>
      {/* food name  */}
      <div className="flex-3">
        <div className="flex justify-between mt-2">
          <span className="text-md font ">
            <b>{name}</b>
          </span>
          <Heartclick onClick={handle} isFav={fav} />
        </div>

        {/* short description  */}
        <div className="text-xs mb-2">{description}</div>
        {/* price rating  */}
        <p>
          {quantity} <span>{unit}</span>
        </p>
        <div className="flex justify-between text-md mb-2 relative">
          <div className="flex gap-2">
            <span>
              <b>₹{price}</b>
            </span>
            <span>🔥 4.3</span>
          </div>
          <button
            className="bg-zinc-100 p-1 rounded-full absolute -right-1 -bottom-1"
            onClick={addCart}
          >
            {inCart ? (
              <ShoppingCart fill="black" />
            ) : (
              <ShoppingCart strokeWidth={1.3} />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HorizontalFC;
