import { ShoppingCart} from "lucide-react";
import { Heartclick } from "../atomic/atomic";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AllCount from "../context/allCount";
const FavouriteFc = ({
  id,
  image,
  name,
  description,
  servingQuantity,
  quantity,
  price,
  unit,
  isFav,
  inCart,
  available,
  satisfymessage,
  //design purpose
  view,
}) => {
  const { favCount, setFavCount, cartCount, setCartCount, user, setUser } =
    useContext(AllCount);

  const [fav, setFav] = useState(isFav);
  const [cartItem, setCartItem] = useState(inCart);
  useEffect(() => {
    setFav(isFav);
    setCartItem(inCart);
  }, [isFav, inCart]);

  
  //favourite handle function add & remove
  const handle = async (e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    if (!id) return;

    //Guest user favoutire item updation
    if (!user || !user.userName) {
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
          servingQuantity: servingQuantity,
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

    //works only when user is logged in.
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
      if (message) {
        setFav((prev) => {
          return !prev;
        });
        satisfymessage(message);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/update/favourite`,
          {
            credentials: "include",
          },
        );
        const { favourites } = await response.json();
        setFavCount(favourites.length);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //handling cart item (add, remove)
  const addCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // GUest user Cart haldle
    if (!user || !user.userName) {
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
          available: available,
        });
        setCartItem(true);
        satisfymessage("item added");
      } else {
        preCart.splice(index, 1);
        setCartItem(false);
        satisfymessage("item removed");
      }
      sessionStorage.setItem("cart", JSON.stringify(preCart));
      setCartCount(preCart.length);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/update/cart`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [{ id: id, quantity: quantity, available: available }],
          command: "add/dlt", //command need for add and delete to separate updation
        }),
      });
      const { code, message } = await res.json();
      if (code.trim() === "success") {
        satisfymessage(message);
        setCartItem((cartItem) => !cartItem);
      }

      //calculate the total number of cart items from DB
      const cartres = await fetch(
        `${import.meta.env.VITE_API_URL}/update/cart`,
        {
          credentials: "include",
        },
      );
      const totalCart = await cartres.json();
      setCartCount(totalCart.length);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Link
      to={`/meal/${id}`}
      className={`group relative flex gap-4 items-center shrink-0 w-full h-40 p-3 mb-4 rounded-2xl bg-white border border-zinc-100 shadow-[0_4px_8px_rgb(0,0,0,0.16)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-300 ease-out
      ${view === "list" ? "sm:min-w-72 sm:grow sm:basis-0 sm:m-0 sm:max-w-90" : "sm:min-w-73 sm:grow sm:basis-0 sm:m-0"}
      ${view === "list" ? "md:max-lg:min-w-87 md:max-lg:max-w-120" : "md:max-lg:min-w-87"}
      ${view === "list" ? "lg:max-2xl:min-w-75 lg:max-2xl:max-w-100" : "lg:max-xl:min-w-90"}
      ${view === "list" ? "2xl:min-w-100 2xl:max-w-122" : "2xl:max-w-100"}`}
    >
      {/* Food Image Container */}
      <div className="relative flex-2 h-full overflow-hidden rounded-xl bg-zinc-50">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          src={image}
          alt=""
        />
      </div>

      {/* Food Content Details */}
      <div className="flex-3 flex flex-col justify-between h-full py-0.5 pr-1">
        <div>
          {/* Top Header Row */}
          <div
            id="name-heart-container"
            className="flex justify-between items-start gap-2"
          >
            <span
              id="Food_name"
              className="text-base font-bold text-zinc-800 tracking-tight line-clamp-1 group-hover:text-amber-500 transition-colors duration-200"
            >
              {name}
            </span>
            <div className="relative z-10 shrink-0 transform active:scale-90 transition-transform">
              <Heartclick onClick={handle} isFav={fav} />
            </div>
          </div>

          {/* Short Description */}
          <div
            id="short-descrip"
            className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed"
          >
            {description}
          </div>
        </div>

        {/* Bottom Information Segment */}
        <div className="space-y-2">
          {/* Serving Quantity, Unit & Availability Status Row */}
          <div
            id="serve-quantity-availability"
            className="flex items-center justify-between gap-2 relative z-10"
          >
            {/* Enhanced Serving Portion Box */}
            <p
              id="serve-unit"
              className="bg-amber-50/65 text-[11px] px-2.5 py-1 rounded-lg border border-amber-100/50 text-amber-900 font-medium tracking-tight"
            >
              <span
                id="food-serve-quantity"
                className="font-extrabold text-amber-700"
              >
                {servingQuantity}
              </span>{" "}
              <span id="food-unit" className="text-amber-800 font-semibold">
                {unit}
              </span>
            </p>

            {/* Availability Status Badge placed on the same line */}
            {available ? (
              <span
                id="food-availbility"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Available
              </span>
            ) : (
              <span
                id="food-availbility"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/50"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                Unavailable
              </span>
            )}
          </div>

          {/* Price, Rating & Action Button */}
          <div
            id="price-rating-cart"
            className="flex justify-between items-center relative"
          >
            <div id="price-rating" className="flex items-baseline gap-2">
              <span id="price" className="text-lg font-extrabold text-zinc-900">
                ₹{price}
              </span>
              <span
                id="rating"
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-bold text-amber-700"
              >
                🔥4.3
              </span>
            </div>

            {/* Modernized Shopping Cart Button */}
            <button
              id="cart"
              className={`relative z-10 p-2 rounded-xl cursor-pointer border transition-all duration-200 active:scale-95 shadow-sm
              ${
                cartItem
                  ? "bg-zinc-900 border-zinc-900 text-white shadow-zinc-900/10"
                  : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300"
              }`}
              onClick={addCart}
            >
              {cartItem ? (
                <ShoppingCart fill="currentColor" size={18} />
              ) : (
                <ShoppingCart strokeWidth={1.8} size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FavouriteFc;
