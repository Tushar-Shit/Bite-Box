import CustomNav from "../CategoryComponents/CustomNav";
import { BottomActionBar } from "../components/BottomBar";
import FeedBackCard from "../components/FeedbackCard";
import { Heartclick } from "../atomic/atomic";
import { ChevronRight, Minus, Plus, ThumbsDown, ThumbsUp } from "lucide-react";
import { SeeMore } from "../atomic/atomic";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShortMsg } from "../components/MessageBar";

const MealDetails = () => {
  const { id } = useParams();

  // Catching food and reviews data
  const [food, setFood] = useState({});
  const [allReviews, setAllReviews] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/meal/${id}`);
        const { foodItem, reviews } = await res.json();
        setFood(foodItem);
        setAllReviews(reviews);
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  }, []);

  // Showing reviews logic
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? allReviews : allReviews.slice(0, 4);

  // Calculating food rating = all reviews rating / all reviews
  const foodRate =
    allReviews.length > 0
      ? Number(
          (
            allReviews.reduce((sum, review) => sum + review.rating, 0) /
            allReviews.length
          ).toFixed(1),
        )
      : 0;

  // Quantity and price calculation
  const [quantity, setQuantity] = useState(1);
  const [finalPrice, setFinalPrice] = useState(0);
  useEffect(() => {
    if (food.price) {
      // Synchronize the price when data initially loads or resets
      setFinalPrice(food.price * quantity);
    }
  }, [food, quantity]); // Re-calculates accurately whenever food data or quantity updates

  const quantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };
  const quantityDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Description "Read More" logic
  const [fullDescription, setFullDescription] = useState(false);
  // Safeguard against missing or undefined description strings
  const words = food.description ? food.description.split(" ") : [];
  const isLongDescription = words.length > 6; // Set to 15 words limit as requested
  const truncatedDescription = isLongDescription
    ? words.slice(0, 6).join(" ")
    : food.description;

  //checking is it in favourite and cart for icon's initial state
  const [state, setState] = useState(false);
  const [inCart, setInCart] = useState(false);
  useEffect(() => {
    if (!id) return;

    //if user not logged in
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user === false) {
      const sessionFav = JSON.parse(sessionStorage.getItem("fav"));
      if (sessionFav) {
        setState(sessionFav.some((item) => item._id === id));
      }

      const sessionCart = JSON.parse(sessionStorage.getItem("cart"));
      if (sessionCart && sessionCart.some((item) => item._id === id)) {
        setInCart(!inCart);
      }
      return;
    }

    //works only when user logged in
    async function getfav() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/favourite`,
          {
            credentials: "include",
          },
        );
        const { favourites } = await response.json();
        const inival = favourites.some((item) => item._id === id);
        setState(inival);

        const data = await fetch(`${import.meta.env.VITE_API_URL}/user/cart`, {
          credentials: "include",
        });
        const items = await data.json();
        console.log(items);
        const exist = items.some((i) => i.foodId._id === id);
        if (exist) setInCart(!inCart);
      } catch (err) {
        console.log(err);
      }
    }
    getfav();
  }, [id]);

  const [msg, setMsg] = useState(null);
  useEffect(() => {
    if (!msg) return;

    const timer = setTimeout(() => {
      setMsg(null);
      // setUpdate(false);
    }, 2000); // 3 seconds

    return () => clearTimeout(timer);
  }, [msg]);

  //handle favourite items (add, remove)
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
          image: food.image,
          name: food.name,
          description: food.description,
          price: food.price,
          unit: food.unit,
          quantity: food.quantity,
        });
        setMsg("item added");
        setState((prev) => !prev);
      } else {
        preFav.splice(index, 1);
        setMsg("item removed");
        setState((prev) => !prev);
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
      setMsg(message);
      setState((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  //handle cart item (add, remove)
  const addCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    //if user not logged in
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user === false) {
      let preCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const index = preCart.findIndex((item) => item._id === id);
      if (index === -1) {
        preCart.push({
          _id: id,
          image: food.image,
          name: food.name,
          price: food.price,
          unit: food.unit,
          quantity: food.quantity,
        });
        setInCart(!inCart);
        setMsg("item added");
      } else {
        preCart.splice(index, 1);
        setInCart(false);
        setMsg("item removed");
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
          data: [{ id: id, quantity: food.quantity }],
          command: "add/dlt", //command need for add and delete to separate updation
        }),
      });
      const { message } = await res.json();
      if (
        message.trim() === "Already in Cart" ||
        message.trim() === "Added to Cart"
      )
        setInCart(!inCart);
      else setInCart(!inCart);
      setMsg(message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="Meal-Page h-full relative ">
      {/* Top navbar */}
      <CustomNav text="Meal Details" />
      {msg && <ShortMsg message={msg} />}

      {/* Main food image */}
      <div className="w-[83vw] h-[30vh] rounded-lg m-auto my-5 relative">
        <img
          src={food.image}
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute top-0 right-0 rounded-full bg-white p-0.5 cursor-pointer">
          <Heartclick onClick={handle} isFav={state} />
        </div>
      </div>

      {/* the buying informations (title, quantity, price) */}
      <div className="h-fit px-6 mb-3">
        <span className="text-2xl font-bold">{food.name}</span>
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">
            {food.quantity} {food.unit}
          </span>
          {/* quantity component */}
          <div className="flex justify-evenly gap-2 items-center bg-zinc-300 rounded-2xl p-1">
            <button
              onClick={quantityDecrease}
              className="bg-white text-black rounded-full p-0.5 border-none cursor-pointer flex items-center justify-center"
            >
              <Minus size={18} />
            </button>
            <div className="font-semibold mx-1 w-4 text-center">{quantity}</div>
            <button
              onClick={quantityIncrease}
              className="bg-orange-500 text-white rounded-full p-0.5 border-none cursor-pointer flex items-center justify-center"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Price & rating */}
        <div className="flex gap-1 items-baseline">
          <span className="text-xl font-semibold">₹{food.price}</span>
          <span className="ml-2 text-amber-500 font-bold">★ {foodRate}</span>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 h-fit mb-4">
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

      {/* Feedbacks */}
      <div className="px-6 mt-5">
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

      {/* Bottom nav (add to cart & buy) */}
      <div className="fixed bottom-0 bg-zinc-100 left-0 w-full z-50">
        <BottomActionBar onClick={addCart} price={finalPrice} state={inCart} />
      </div>
    </div>
  );
};

export default MealDetails;
