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
  satisfymessage,
}) => {
  // sessionStorage.clear();
  const [fav, setFav] = useState(isFav);
  useEffect(() => {
    setFav(isFav);
  }, [isFav]);

  const [inCart, setInCart] = useState(false);
  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user === false) {
      //Heart UI from session
      const sessionFav = JSON.parse(sessionStorage.getItem("fav"));
      if (sessionFav) {
        const existFav = sessionFav.find((item) => item._id === id);
        if (existFav) setFav(true);
      }

      //Cart UI from session
      const sessionCart = JSON.parse(sessionStorage.getItem("cart"));
      // console.log(sessionCart);
      if (sessionCart) {
        const existCart = sessionCart.find((item) => item._id === id);
        if (existCart) setInCart(true);
      }
      return;
    }

    //extract cart items
    async function getCart() {
      const data = await fetch(`${import.meta.env.VITE_API_URL}/user/cart`, {
        credentials: "include",
      });
      const item = await data.json();
      if (!item || item.code === "ND" || item.code === "NL") return;
      if (item.some((i) => i.foodId._id === id)) setInCart(!inCart);
    }
    getCart();
  }, []);

  //favourite handle function add & remove
  const handle = async (e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    if (!id) return;

    //if user not logged in
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user === false) {
      let preFav = JSON.parse(sessionStorage.getItem("fav")) || [];
      const index = preFav.findIndex((item) => item._id === id);
      if (index === -1) {
        preFav.push({
          _id: id,
          image:image,
          name: name,
          description: description,
          price: price,
          unit: unit,
          quantity: quantity,
        });
        satisfymessage("item added");
        setFav((prev) => {
          return !prev;
        });
      } else {
        preFav.splice(index, 1);
        satisfymessage("item removed");
        setFav((prev) => {
          return !prev;
        });
      }
      sessionStorage.setItem("fav", JSON.stringify(preFav));
      return;
    }

    //works only when user is logged in.
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
      if (message) {
        setFav((prev) => {
          return !prev;
        });
        satisfymessage(message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //handling cart item (add, remove)
  const addCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user === false) {
      let preCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const index = preCart.findIndex((item) => item._id === id);
      if (index === -1) {
        preCart.push({
          _id: id,
          image:image,
          name: name,
          price:price,
          unit: unit,
          quantity: quantity,
        });
        setInCart(true);
        satisfymessage("item added");
      } else {
        preCart.splice(index, 1);
        setInCart(false);
        satisfymessage("item removed");
      }
      sessionStorage.setItem("cart", JSON.stringify(preCart));
      return;
    }
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
      if (message.trim() === "Already in Cart") {
        console.log(message);
        satisfymessage(message);
        setInCart(!inCart);
      }
      if (message.trim() === "Cart is full") {
        satisfymessage(message);
        setInCart(false);
      } else setInCart(!inCart);
      satisfymessage(message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Link
      to={`/meal/${id}`}
      className="bg-zinc-200 p-3 mb-3 h-35 flex  gap-3 items-center rounded-lg shadow-[4px_1px_7px_rgba(0,0,0,0.4)]"
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
          <span className="text-md">
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
