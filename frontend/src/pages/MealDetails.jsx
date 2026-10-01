import CustomNav from "../CategoryComponents/CustomNav";
import { BottomActionBar } from "../components/BottomBar";
import FeedBackCard from "../components/FeedbackCard";
import { Heartclick, SeeMore } from "../atomic/atomic";
import { Minus, Plus } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import AllCount from "../context/allCount";
import { useNavigate, useParams } from "react-router-dom";
import { ShortMsg } from "../components/MessageBar";
import { Clock, Flame, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";
import FeedbackDashboard from "../components/FeedbackDashboard";
import FeedbackCard from "../components/FeedbackCard";
import SquareFC from "../components/SquareFC";
const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favCount, setFavCount, cartCount, setCartCount, user } =
    useContext(AllCount);
  // console.log(user);
  // ----------------------     STATES     ----------------------------
  const [fav, setFav] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [food, setFood] = useState({});
  const [ratings, setRatings] = useState([]);
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
        const { foodItem, ratings, reviews } = await res.json();
        console.log("food details",foodItem, ratings,reviews);
        setFood(foodItem);
        setRatings(ratings);
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
      if (itemExist) setQuantity(itemExist.quantity);
      else setQuantity(newQuantity);
    } catch (e) {
      console.log(e);
    }
  }

  // ================================= REVIEWS CALCULATION ==============================
  const averageRating =
    ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length;
  let fiveStar = 0;
  let fourStar = 0;
  let threeStar = 0;
  let twoStar = 0;
  let oneStar = 0;

  for (let item of ratings) {
    switch (item.rating) {
      case 5:
        fiveStar++;
        break;
      case 4:
        fourStar++;
        break;
      case 3:
        threeStar++;
        break;
      case 2:
        twoStar++;
        break;
      case 1:
        oneStar++;
        break;
    }
  }
  // console.log(fiveStar, fourStar, threeStar, twoStar, oneStar);
  // console.log(averageRating);

  // ============================= DESCRIPTION ===============================
  const words = food.description ? food.description.split(" ") : [];
  const isLongDescription = words.length > 10;
  const truncatedDescription = isLongDescription
    ? words.slice(0, 10).join(" ")
    : food.description;

  //================================ MESSAGE TIMEOUT ==========================
  useEffect(() => {
    if (!msg) return;
    const timer = setTimeout(() => {
      setMsg(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [msg]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    age: "",
  });

 
  // ================================================= Place order =============================================================

  const foodObj = {
    foodId: food,
    quantity: quantity,
    price: finalPrice,
    available: food.available,
  };

  // console.log(foodObj);
  const buy = async () => {
    navigate("/place-order", {
      state: { items: [foodObj] },
    });
  };

  return (
    <div className="fixed inset-0 h-dvh flex flex-col">
      <Helmet>
        <title>BiteBox | Meal Details</title>
      </Helmet>
      {/* Top navbar */}
      <CustomNav text="Meal Details" />

      {/* Message */}
      {msg && <ShortMsg message={msg} />}
      <main className="flex-1 min-h-0 overflow-y-auto scrollbar-none">
        {/* Food image and background */}
        <div className="relative overflow-visible lg:w-4/9 lg:top-1">
          <div className="absolute w-72 h-72 rounded-full bg-[#fff6cd]/40 blur-3xl mix-blend-screen pointer-events-none transform -translate-y-4"></div>
          <div className="relative z-10 flex items-center justify-center">
            <img
              src={food.image}
              alt={food.name || "Food item"}
              className="w-60 h-60 object-cover rounded-full shadow-[0_20px_40px_rgba(255,246,205,0.3)] border-4 border-white/10"
            />
            <div className="z-20 h-9 w-9 absolute top-2 right-2 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md p-0.5 cursor-pointer shadow-md hover:scale-105 transition-transform">
              <Heartclick onClick={handle} isFav={fav} />
            </div>
          </div>
          <p className="mt-1 text-2xl text-center font-bold">{food.name}</p>
        </div>
        {/* price and regulator */}
        <div className="border mt-2 mx-3 px-3 py-2 rounded-xl border-[#ffbee0d6] bg-[#ffebebf0] flex justify-between items-center lg:w-22/50">
          <div className="pl-3">
            <p className="text-xl font-bold text-[#ea005d]">₹{food.price}</p>
            <p className="text-sm font-semibold">
              {food.quantity} {food.unit}
            </p>
          </div>
          <div className="flex justify-evenly gap-2 items-center bg-[#f6f6f6] rounded-2xl">
            <button
              onClick={() => updateQuantity("decrease")}
              className="bg-white rounded-full p-2 border-none cursor-pointer flex items-center justify-center"
            >
              <Minus size={18} />
            </button>

            <div className="font-semibold mx-1 w-4 text-center">{quantity}</div>

            <button
              onClick={() => updateQuantity("increase")}
              className="bg-[#ff013c] text-white rounded-full p-2 border-none cursor-pointer flex items-center justify-center"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
        {/* extra information */}
        <div className="mt-2 px-2 flex items-center justify-around lg:w-22/50">
          <div className="max-h-15 max-w-35 border border-[#7d7d7d] flex gap-1.5 items-center p-2 rounded-lg">
            <div className="text-red">
              <Clock color="#ff2445" />
            </div>
            <div>
              <p className="text-md font-bold">20-25 min</p>
              <p className="text-xs">Time Required</p>
            </div>
          </div>
          <div className="max-h-15 max-w-35 border border-[#7d7d7d] flex gap-1.5 items-center p-2 rounded-lg">
            <div className="text-red">
              <Flame color="#ff7b00" fill="#ff7b00" />
            </div>
            <div>
              <p className="text-md font-bold">450 kcal</p>
              <p className="text-xs">Calories</p>
            </div>
          </div>
          {ratings.length > 0 && (
            <div className="max-h-15 max-w-35 border border-[#7d7d7d] flex gap-1.5 items-center p-2 rounded-lg">
              <div className="text-red">
                <Star color="#ffd000" fill="#ffd000" />
              </div>
              <div>
                <p className="text-md font-bold">{averageRating.toFixed(1)}</p>
                <p className="text-xs">({ratings.length} reviews)</p>
              </div>
            </div>
          )}
        </div>
      
        {/* Description */}
        <div className="px-6 h-fit mt-4 mb-2 lg:w-22/50">
          <div className="text-lg font-bold text-red-700">Description</div>
          <p className="text-zinc-700 leading-relaxed text-sm text-justify">
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
        {/* feedback section */}
        {allReviews.length > 0 && (
          <div className="mt-5 lg:w-27/50 lg:absolute lg:top-16 lg:right-2">
            <div className="pl-5 text-lg font-bold text-zinc-700 mb-1 flex gap-1 items-baseline lg:hidden">
              {/* <span className="border-2 border-[#ff9d00] h-4"></span>Feedbacks */}
              <span className="border-2 border-[#ff005d] h-4"></span>Feedbacks
            </div>

            {/* feedback dashboard */}
            <FeedbackDashboard
              avgRating={averageRating}
              totalRating={ratings.length}
              fiveStar={fiveStar}
              fourStar={fourStar}
              threeStar={threeStar}
              twoStar={twoStar}
              oneStar={oneStar}
            />

            {/* feedback card */}
            <div className="mt-2 overflow-x-auto scrollbar-none lg:p-0 lg:h-70 lg:overflow-x-hidden lg:block">
              {allReviews.map((item) => (
                <FeedbackCard
                  key={item.comment}
                  name={item.author}
                  text={item.comment}
                  star={item.rating}
                />
              ))}
            </div>
          </div>
        )}
        {/* suggest some other food items */}
        <h3 className="m-0 mt-5 text-md pl-3 font-bold lg:hidden">
          You might like
        </h3>
        <div className="flex  lg:absolute lg:right-6 lg:w-[52vw] lg:bottom-1 overflow-x-auto scrollbar-none">

          <SquareFC
            key="hello"
            id="6aa7f82eae81240c6679b031"
            image="https://img.magnific.com/free-psd/roasted-chicken-dinner-platter-delicious-feast_632498-25445.jpg?semt=ais_hybrid&w=740&q=80"
            name="Vegetable"
            description="Good for health"
            servingQuantity="5"
            quantity="1"
            price="50"
            unit="KG"
            isFav={true}
            available={true}
            suggestion={true}
          />
          <SquareFC
            key="hello"
            id="6aa7f82eae81240c6679b031"
            image="https://img.magnific.com/free-psd/roasted-chicken-dinner-platter-delicious-feast_632498-25445.jpg?semt=ais_hybrid&w=740&q=80"
            name="Vegetable"
            description="Good for health"
            servingQuantity="5"
            quantity="1"
            price="50"
            unit="KG"
            isFav={true}
            available={true}
            suggestion={true}
          />
          <SquareFC
            key="hello"
            id="6aa7f82eae81240c6679b031"
            image="https://img.magnific.com/free-psd/roasted-chicken-dinner-platter-delicious-feast_632498-25445.jpg?semt=ais_hybrid&w=740&q=80"
            name="Vegetable"
            description="Good for health"
            servingQuantity="5"
            quantity="1"
            price="50"
            unit="KG"
            isFav={true}
            available={true}
            suggestion={true}
          />
          <SquareFC
            key="hello"
            id="6aa7f82eae81240c6679b031"
            image="https://img.magnific.com/free-psd/roasted-chicken-dinner-platter-delicious-feast_632498-25445.jpg?semt=ais_hybrid&w=740&q=80"
            name="Vegetable"
            description="Good for health"
            servingQuantity="5"
            quantity="1"
            price="50"
            unit="KG"
            isFav={true}
            available={true}
            suggestion={true}
          />
          <SquareFC
            key="hello"
            id="6aa7f82eae81240c6679b031"
            image="https://img.magnific.com/free-psd/roasted-chicken-dinner-platter-delicious-feast_632498-25445.jpg?semt=ais_hybrid&w=740&q=80"
            name="Vegetable"
            description="Good for health"
            servingQuantity="5"
            quantity="1"
            price="50"
            unit="KG"
            isFav={true}
            available={true}
            suggestion={true}
          />
          <SquareFC
            key="hello"
            id="6aa7f82eae81240c6679b031"
            image="https://img.magnific.com/free-psd/roasted-chicken-dinner-platter-delicious-feast_632498-25445.jpg?semt=ais_hybrid&w=740&q=80"
            name="Vegetable"
            description="Good for health"
            servingQuantity="5"
            quantity="1"
            price="50"
            unit="KG"
            isFav={true}
            available={true}
            suggestion={true}
          />
          <SquareFC
            key="hello"
            id="6aa7f82eae81240c6679b031"
            image="https://img.magnific.com/free-psd/roasted-chicken-dinner-platter-delicious-feast_632498-25445.jpg?semt=ais_hybrid&w=740&q=80"
            name="Vegetable"
            description="Good for health"
            servingQuantity="5"
            quantity="1"
            price="50"
            unit="KG"
            isFav={true}
            available={true}
            suggestion={true}
          />
          <SquareFC
            key="hello"
            id="6aa7f82eae81240c6679b031"
            image="https://img.magnific.com/free-psd/roasted-chicken-dinner-platter-delicious-feast_632498-25445.jpg?semt=ais_hybrid&w=740&q=80"
            name="Vegetable"
            description="Good for health"
            servingQuantity="5"
            quantity="1"
            price="50"
            unit="KG"
            isFav={true}
            available={true}
            suggestion={true}
          />
          <SquareFC
            key="hello"
            id="6aa7f82eae81240c6679b031"
            image="https://img.magnific.com/free-psd/roasted-chicken-dinner-platter-delicious-feast_632498-25445.jpg?semt=ais_hybrid&w=740&q=80"
            name="Vegetable"
            description="Good for health"
            servingQuantity="5"
            quantity="1"
            price="50"
            unit="KG"
            isFav={true}
            available={true}
            suggestion={true}
          />
          <SquareFC
            key="hello"
            id="6aa7f82eae81240c6679b031"
            image="https://img.magnific.com/free-psd/roasted-chicken-dinner-platter-delicious-feast_632498-25445.jpg?semt=ais_hybrid&w=740&q=80"
            name="Vegetable"
            description="Good for health"
            servingQuantity="5"
            quantity="1"
            price="50"
            unit="KG"
            isFav={true}
            available={true}
            suggestion={true}
          />
          
        </div>
      </main>
      {/* Bottom action bar */}
      <div className="lg:w-23/50">
        <BottomActionBar
          onClick={addCart}
          price={finalPrice}
          state={inCart}
          buy={buy}
        />
      </div>
    </div>
  );
};

export default MealDetails;
