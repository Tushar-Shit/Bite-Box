import { ShoppingCart, Search, UserRound, Component } from "lucide-react";
import { Heartclick } from "../atomic/atomic";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const FavouriteFc = ({
  name,
  servingQuantity,
  quantity,
  price,
  image,
  description,
  unit,
  id,
  isFav,
  satisfymessage,
  reload,
  //design purpose
  view,
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
          image: image,
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
        reload();
      } else {
        preFav.splice(index, 1);
        satisfymessage("item removed");
        setFav((prev) => {
          return !prev;
        });
        reload();
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
        reload();
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
          image: image,
          name: name,
          price: price,
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
          data: [{ id: id, quantity: quantity }],
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
      className={`w-full h-35 shrink-0 bg-zinc-200 p-3 mb-4 flex gap-3 items-center rounded-lg shadow-[4px_1px_7px_rgba(0,0,0,0.4)]
                  ${view === "list" ? "sm:min-w-72 sm:grow sm:basis-0 sm:m-0 sm:max-w-90" : "sm:min-w-73 sm:grow sm:basis-0 sm:m-0"}
                  ${view === "list" ? "md:max-lg:min-w-87 md:max-lg:max-w-120" : "md:max-lg:min-w-87"}
                  ${view === "list" ? "lg:max-2xl:min-w-75 lg:max-2xl:max-w-100" : "lg:max-xl:min-w-90"}
                  ${view === "list" ? "2xl:min-w-100 2xl:max-w-122" : "2xl:max-w-100"}`}
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
        <div id="name-heart-container" className="flex justify-between mt-2">
          <span id="Food_name" className="w-2/3 text-md font-bold truncate">
            {name}
          </span>
          <Heartclick onClick={handle} isFav={fav} />
        </div>

        {/* short description  */}
        <div id="short-descrip" className="text-sm line-clamp-2">
          {description}
        </div>
        {/* serving quantity & unit */}
        <p
          id="serve-quantity-availability"
          className="min-w-35 w-3/6 flex items-center justify-between"
        >
          <p id="serve-unit">
            <span id="food-serve-quantity">{servingQuantity}</span>{" "}
            <span id="food-unit">{unit}</span>
          </p>
          <span
            id="food-availbility"
            className="text-sm font-bold text-green-700"
          >
            <span className="text-lg mr-0.5">&#183;</span>Available
          </span>
        </p>
        <div
          id="price-rating-cart"
          className="flex justify-between text-md mb-2 relative"
        >
          <div id="price-rating" className="flex gap-2">
            <span id="price" className="font-bold">
              ₹{price}
            </span>
            <span id="rating">🔥4.3</span>
          </div>
          <button
            id="cart"
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

export default FavouriteFc;
