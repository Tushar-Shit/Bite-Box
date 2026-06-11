import CustomNav from "../CategoryComponents/CustomNav";
import { BottomActionBar } from "../components/BottomBar";
import FeedBackCard from "../components/FeedbackCard";
import { Heartclick } from "../atomic/atomic";
import { ChevronRight, Minus, Plus, ThumbsDown, ThumbsUp } from "lucide-react";
import { SeeMore } from "../atomic/atomic";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MealDetails = () => {
  // Catching food data and reviews data
  const [food, setFood] = useState({});
  const [allReviews, setAllReviews] = useState([]);
  const { items, id } = useParams();
  // console.log(items, id);
  useEffect(() => {
    async function getData() {
      try {
        if (items && id) {
          const res = await fetch(`/api/categories/${items}/${id}`);
          const { foodItem, reviews } = await res.json();
          setFood(foodItem);
          setAllReviews(reviews);
        }
        const res = await fetch(`/api/meal/${id}`);
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

  return (
    <div className="Meal-Page h-full relative ">
      {/* Top navbar */}
      <CustomNav text="Meal Details" />

      {/* Main food image */}
      <div className="w-[83vw] h-[30vh] rounded-lg m-auto my-5">
        <img
          src={food.image}
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Title & quantity */}
      <div className="h-fit px-6 mb-3">
        <div className="flex justify-between items-center ">
          <span className="text-2xl font-bold">{food.name}</span>
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
          <span className="text-zinc-500 text-sm">/Unit</span>
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
        <BottomActionBar price={finalPrice} />
      </div>
    </div>
  );
};

export default MealDetails;
