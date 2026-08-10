import CustomNav from "../CategoryComponents/CustomNav";
import { BottomActionBar } from "../components/BottomBar";
import FeedBackCard from "../components/FeedbackCard";
import { Heartclick, SeeMore } from "../atomic/atomic";
import { Minus, Plus } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import AllCount from "../context/allCount";
import { useParams } from "react-router-dom";
import { ShortMsg } from "../components/MessageBar";

const MealDetails = () => {
  const { id } = useParams();

  const { favCount, setFavCount, cartCount, setCartCount, user } =
    useContext(AllCount);

  // ----------------------     STATES     ----------------------------
  const [fav, setFav] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [food, setFood] = useState({});
  const [allReviews, setAllReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [showAll, setShowAll] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);
  const [fullDescription, setFullDescription] = useState(false);
  const [msg, setMsg] = useState(null);

  //================================  GET FOOD + REVIEWS  ==============================
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/meal/${id}`);
        const { foodItem, reviews } = await res.json();
        setFood(foodItem);
        setAllReviews(reviews);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [id]);

  //================================  ICONS'S INITIAL STATE  ==============================
  useEffect(() => {
    // ------------------------GUEST USER-----------------------------
    const initializeUserData = async () => {
      if (!user?.userName) {
        const sessionFav = JSON.parse(sessionStorage.getItem("fav")) || [];
        const isFavourite = sessionFav.some(
          (item) => String(item._id) === String(id),
        );
        setFav(isFavourite);

        const sessionCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        const cartItem = sessionCart.find(
          (item) => String(item._id) === String(id),
        );
        if (cartItem) {
          setQuantity(cartItem.quantity);
          setInCart(true);
        } else setInCart(false);

        return;
      }

      // -----------------------------LOGGED-IN USER------------------------------
      try {
        //````````````````````````````favourite``````````````````````````````
        const favResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/update/favourite`,
          {
            credentials: "include",
          },
        );
        const favData = await favResponse.json();
        const favourites = favData.favourites || [];
        const isFavourite = favourites.some(
          (item) => String(item._id) === String(id),
        );
        setFav(isFavourite);

        //````````````````````````````````cart```````````````````````````````
        const cartResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/update/cart`,
          {
            credentials: "include",
          },
        );
        const cartData = await cartResponse.json();
        // Your API appears to return "ND" when cart is empty
        if (cartData.code === "ND" || !Array.isArray(cartData)) {
          setInCart(false);
          setQuantity(1);
          return;
        }

        const cartItem = cartData.find(
          (item) => String(item.foodId?._id) === String(id),
        );

        if (cartItem) {
          setQuantity(cartItem.quantity);
          setInCart(true);
        } else {
          setInCart(false);
          setQuantity(1);
        }
      } catch (err) {
        console.error("Failed to initialize favourite/cart:", err);
      }
    };

    initializeUserData();
  }, [user, id]);

  // ============================== FAVOURITE HANDLER===============================
  const handle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id) return;

    // -------------------- GUEST USER ------------------------
    if (!user || !user.userName) {
      let preFav = JSON.parse(sessionStorage.getItem("fav")) || [];
      const index = preFav.findIndex((item) => String(item._id) === String(id));
      if (index === -1) {
        preFav.push({
          _id: id,
          image: food.image,
          name: food.name,
          description: food.description,
          price: food.price,
          unit: food.unit,
          quantity: food.quantity,
          available: food.available,
        });
        setMsg("item added");
        setFav(true);
      } else {
        preFav.splice(index, 1);
        setMsg("item removed");
        setFav(false);
      }
      sessionStorage.setItem("fav", JSON.stringify(preFav));
      setFavCount(preFav.length);
      return;
    }

    // -------------------- LOGGED-IN USER ------------------------
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
      setMsg(message);
      setFav((prev) => !prev);

      // Update favourite count
      const totalFav = await fetch(
        `${import.meta.env.VITE_API_URL}/update/favourite`,
        {
          credentials: "include",
        },
      );
      const { favourites } = await totalFav.json();
      setFavCount(favourites.length);
    } catch (err) {
      console.log(err);
    }
  };

  //============================== CART HANDLER =============================
  const addCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // ------------------------ GUEST USER ---------------------------
    if (!user || !user.userName) {
      let preCart = JSON.parse(sessionStorage.getItem("cart")) || [];

      const index = preCart.findIndex(
        (item) => String(item._id) === String(id),
      );

      if (index === -1) {
        preCart.push({
          _id: id,
          image: food.image,
          name: food.name,
          price: food.price,
          unit: food.unit,
          quantity: quantity,
          servingQuantity: food.servingQuantity,
          available: food.available,
        });
        setInCart(true);
        setMsg("item added");
      } else {
        preCart.splice(index, 1);
        setInCart(false);
        setMsg("item removed");
      }
      sessionStorage.setItem("cart", JSON.stringify(preCart));
      setCartCount(preCart.length);
      return;
    }

    // ----------------------- LOGGED-IN USER  -----------------------------
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/update/cart`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              id: id,
              quantity: quantity,
              available: food.available,
            },
          ],
          command: "add/dlt",
        }),
      });
      const { code, message } = await res.json();
      if (code.trim() === "success") setInCart((pre) => !pre);
      else setInCart((pre) => !pre);
      setMsg(message);

      // Update cart count
      const totalCart = await fetch(
        `${import.meta.env.VITE_API_URL}/update/cart`,
        {
          credentials: "include",
        },
      );
      const cartlength = await totalCart.json();
      setCartCount(cartlength.length);
    } catch (e) {
      console.log(e);
    }
  };

  //======================== QUANTITY + PRICE =========================
  useEffect(() => {
    if (food.price) {
      setFinalPrice(food.price * quantity);
    }
  }, [food, quantity]);
  //======================== QUANTITY + PRICE =========================
  async function updateQuantity(command) {
    const newQuantity =
      command === "increase" ? quantity + 1 : Math.max(1, quantity - 1);

    // --------------------GUEST USER------------------------
    if (!user || !user.userName) {
      const sessionCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const thisItem = sessionCart.find(
        (item) => String(item._id) === String(id),
      );
      setQuantity(newQuantity);

      if (thisItem) {
        thisItem.quantity = newQuantity;
        sessionStorage.setItem("cart", JSON.stringify(sessionCart));
      }
      return;
    }

    // -------------------------LOGGED-IN USER-------------------------
    try {
      const data = await fetch(`${import.meta.env.VITE_API_URL}/update/cart`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodId: id,
          originalPrice: food.price,
          command: command,
        }),
      });
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/update/cart`,
        {
          credentials: "include",
        },
      );
      const cartItems = await response.json();
      const itemExist = cartItems.find((i) => i.foodId._id === id);
      setQuantity(itemExist.quantity);
    } catch (e) {
      console.log(e);
    }
  }

  // ================================= REVIEWS ==============================
  const displayedReviews = showAll ? allReviews : allReviews.slice(0, 4);
  const foodRate =
    allReviews.length > 0
      ? Number(
          (
            allReviews.reduce((sum, review) => sum + review.rating, 0) /
            allReviews.length
          ).toFixed(1),
        )
      : 0;

  // ============================= DESCRIPTION ===============================
  const words = food.description ? food.description.split(" ") : [];
  const isLongDescription = words.length > 6;
  const truncatedDescription = isLongDescription
    ? words.slice(0, 6).join(" ")
    : food.description;

  //================================ MESSAGE TIMEOUT ==========================
  useEffect(() => {
    if (!msg) return;
    const timer = setTimeout(() => {
      setMsg(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [msg]);

  return (
    <div className="fixed inset-0 h-dvh flex flex-col">
      {/* Top navbar */}
      <CustomNav text="Meal Details" />

      {/* Message */}
      {msg && <ShortMsg message={msg} />}
      <main className="flex-1 min-h-0 overflow-y-auto scrollbar-none">
        {/* Food image */}
        <div className="border w-[90%] h-[30vh] rounded-lg m-auto my-3 relative">
          <img
            src={food.image}
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />

          <div className="h-9 w-9 absolute top-2 right-2 flex items-center justify-center rounded-full bg-white p-0.5 cursor-pointer">
            <Heartclick onClick={handle} isFav={fav} />
          </div>
        </div>

        {/* Food information */}
        <div className="border h-fit px-6 mb-3">
          <span className="text-2xl font-bold">{food.name}</span>

          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">
              {food.quantity} {food.unit}
            </span>

            {/* Quantity */}
            <div className="flex justify-evenly gap-2 items-center bg-zinc-300 rounded-2xl p-1">
              <button
                onClick={() => updateQuantity("decrease")}
                className="bg-white text-black rounded-full p-0.5 border-none cursor-pointer flex items-center justify-center"
              >
                <Minus size={18} />
              </button>

              <div className="font-semibold mx-1 w-4 text-center">
                {quantity}
              </div>

              <button
                onClick={() => updateQuantity("increase")}
                className="bg-orange-500 text-white rounded-full p-0.5 border-none cursor-pointer flex items-center justify-center"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Price + rating */}
          <div className="flex gap-1 items-baseline">
            <span className="text-xl font-semibold">₹{food.price}</span>

            <span className="ml-2 text-amber-500 font-bold">★ {foodRate}</span>
          </div>
        </div>

        {/* Description */}
        <div className="border px-6 h-fit mb-4">
          <div className="text-lg font-bold text-red-700 mb-1">Description</div>

          <p className="text-zinc-700 leading-relaxed text-sm">
            {fullDescription ? food.description : truncatedDescription}

            {isLongDescription && (
              <span
                onClick={() => setFullDescription(!fullDescription)}
                className="text-red-500 font-bold ml-1 hover:underline bg-transparent border-none cursor-pointer outline-none"
              >
                {fullDescription ? "Read Less" : "Read More..."}
              </span>
            )}
          </p>
        </div>

        {/* Reviews */}
        <div className="border px-6 mt-5">
          <div className="text-lg font-bold text-zinc-700 mb-1">Feedbacks</div>

          <div className="feedback-con h-fit mb-24 flex flex-col gap-3">
            {displayedReviews.map((review) => (
              <FeedBackCard
                key={review._id}
                id={review._id}
                author={review.author}
                rating={review.rating}
                like={review.like}
                unlike={review.unlike}
                comment={review.comment}
              />
            ))}

            {allReviews.length > 4 && (
              <SeeMore
                text={showAll ? "See Less" : "See More"}
                onClick={() => {
                  setShowAll(!showAll);
                }}
              />
            )}
          </div>
        </div>
      </main>
      {/* Bottom action bar */}
      <BottomActionBar onClick={addCart} price={finalPrice} state={inCart} />
    </div>
  );
};

export default MealDetails;
