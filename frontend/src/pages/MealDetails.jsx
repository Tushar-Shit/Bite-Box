import CustomNav from "../CategoryComponents/CustomNav";
import { BottomActionBar } from "../components/BottomBar";
import FeedBackCard from "../components/FeedbackCard";
import { Heartclick } from "../atomic/atomic";
import { ChevronRight, Minus, Plus, ThumbsDown, ThumbsUp } from "lucide-react";
import { SeeMore } from "../atomic/atomic";
import { useState, useEffect, useContext } from "react";
import AllCount from "../context/allCount";
import { useParams } from "react-router-dom";
import { ShortMsg } from "../components/MessageBar";

const MealDetails = () => {
  const { id } = useParams();

  const { favCount, setFavCount, cartCount, setCartCount, user, setUser } =
    useContext(AllCount);

  //fav, cart, food, reviews informations
  const [fav, setFav] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [food, setFood] = useState({});
  const [allReviews, setAllReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function getData() {
      try {
        //extract food & reviews data
        const res = await fetch(`${import.meta.env.VITE_API_URL}/meal/${id}`);
        const { foodItem, reviews } = await res.json();
        setFood(foodItem);
        setAllReviews(reviews);

        //  Guest user icons setup
        if (!user || !user.user.userName) {
          const sessionFav = JSON.parse(sessionStorage.getItem("fav")) || [];
          if (sessionFav.some((item) => item._id === id)) setFav(true);

          const sessionCart = JSON.parse(sessionStorage.getItem("cart")) || [];
          if (sessionCart.some((item) => item._id === id)) {
            const item = sessionCart.find((item) => item._id === id);
            setQuantity(item.quantity);
            setInCart(true);
          }
          return;
        }

        //  User icon setup ||  fav icon
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/update/favourite`,
          {
            credentials: "include",
          },
        );
        const { favourites } = await response.json();
        setFav(favourites.some((item) => item._id === id));

        //  User icon setup ||  cart icon
        const data = await fetch(`${import.meta.env.VITE_API_URL}/user/cart`, {
          credentials: "include",
        });
        const items = await data.json();
        if (items.code === "ND") return;
        const exist = items.find((i) => i.foodId._id === id);
        console.log(exist);
        if (exist) {
          setQuantity(exist.quantity);
          setInCart(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [user]);

  //handle favourite items (add, remove)
  const handle = async (e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    if (!id) return;

    //if user not logged in
    if (!user || !user.userName) {
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

  //handle cart item (add, remove)
  const addCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    //if user not logged in
    if (!user || !user.userName) {
      let preCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const index = preCart.findIndex((item) => item._id === id);
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
      if (
        message.trim() === "Already in Cart" ||
        message.trim() === "Added to Cart"
      )
        setInCart(true);
      else setInCart(false);
      setMsg(message);

      const totalCart = await fetch(
        `${import.meta.env.VITE_API_URL}/user/cart`,
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
  const [finalPrice, setFinalPrice] = useState(0);
  useEffect(() => {
    if (food.price) {
      // Synchronize the price when data initially loads or resets
      setFinalPrice(food.price * quantity);
    }
  }, [food, quantity]); // Re-calculates accurately whenever food data or quantity updates

  // ========== updation of the food (guest user nad real user) ==========
  async function updateQuantity(command) {
    //calculate the new quantity
    const newQuantity =
      command === "increase" ? quantity + 1 : Math.max(1, quantity - 1);

    //set UI, session cart(if) || when user not logged in
    if (!user || !user.username) {
      const sessionCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const thisItem = sessionCart.find((item) => item._id === id);
      setQuantity(newQuantity); //update the UI first
      if (thisItem) {
        thisItem.quantity = newQuantity;
        sessionStorage.setItem("cart", JSON.stringify(sessionCart));
      }
      return;
    }
    //set UI, DB cart || when user logged in
    try {
      const data = await fetch(`${import.meta.env.VITE_API_URL}/user/cart`, {
        credentials: "include",
      });
      const cartItems = await data.json();
      const itemExist = cartItems.find((i) => i.foodId._id === id);
      setQuantity(newQuantity); //update the UI first
      if (itemExist) {
        itemExist.quantity = newQuantity;
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/cart`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: [{ id: id, quantity: itemExist.quantity }],
            command: "SCA", //store as it is in DB
          }),
        });
        const { message } = await res.json();
        console.log(message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Description "Read More" logic
  const [fullDescription, setFullDescription] = useState(false);
  // Safeguard against missing or undefined description strings
  const words = food.description ? food.description.split(" ") : [];
  const isLongDescription = words.length > 6; // Set to 15 words limit as requested
  const truncatedDescription = isLongDescription
    ? words.slice(0, 6).join(" ")
    : food.description;

  const [msg, setMsg] = useState(null);
  useEffect(() => {
    if (!msg) return;

    const timer = setTimeout(() => {
      setMsg(null);
    }, 2000); 

    return () => clearTimeout(timer);
  }, [msg]);

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
          <Heartclick onClick={handle} isFav={fav} />
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
              onClick={() => updateQuantity("decrease")}
              className="bg-white text-black rounded-full p-0.5 border-none cursor-pointer flex items-center justify-center"
            >
              <Minus size={18} />
            </button>
            <div className="font-semibold mx-1 w-4 text-center">{quantity}</div>
            <button
              onClick={() => updateQuantity("increase")}
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
