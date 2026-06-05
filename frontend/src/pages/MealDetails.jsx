import CustomNav from "../CategoryComponents/CustomNav";
import { BottomActionBar } from "../components/BottomBar";
import FeedBackCard from "../components/FeedbackCard";
import { Heartclick } from "../atomic/atomic";
import { ChevronRight, Minus, Plus, ThumbsDown, ThumbsUp } from "lucide-react";
import { SeeMore } from "../atomic/atomic";
import { useState } from "react";

const MealDetails = () => {
  const [quantity, setQuantity] = useState(1);
  let price = 63;
  const [finalPrice, setFinalPrice] = useState(price);
  const quantityIncrease = () => {
    quantity > 0 ? setQuantity(quantity + 1) : setQuantity(1);
    setFinalPrice(finalPrice + price);
  };
  const quantityDecrease = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
    finalPrice == price
      ? setFinalPrice(price)
      : setFinalPrice(finalPrice - price);
  };
  return (
    <div className="Meal-Page h-full relative ">
      {/* top navbar */}
      <CustomNav text="Meal Details" />

      {/* main food image */}
      <div className="w-[83vw] h-[30vh] rounded-lg m-auto my-5">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzvMyociTNf4UqFHzh5Iu5503ne7cfJkLbg&s"
          alt=""
          className=" w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* title & quantity  */}
      <div className="h-fit px-6 mb-3">
        <div className="flex justify-between items-center ">
          <span className="text-2xl font-bold">Jumbo Burger</span>
          <div className="flex justify-evenly gap-2 items-center bg-zinc-300 rounded-2xl p-1">
            <div className="bg-white text-black rounded-full">
              <Minus onClick={quantityDecrease} />
            </div>
            <div className="font-semibold mx-1">{quantity}</div>
            <div className="bg-orange-500 text-white rounded-full">
              <Plus onClick={quantityIncrease} />
            </div>
          </div>
        </div>

        {/* price & rating  */}
        <div className="flex gap-1 items-baseline">
          <span className="text-xl font-semibold">₹63</span>
          <span className="text-zinc-500 text-sm">/Unit</span>{" "}
          <span className="ml-2">star 4.5</span>
        </div>
      </div>

      {/* description  */}
      <div className="px-6 h-fit">
        <div className="text-lg font-bold text-red-700 mb-1">Description</div>
        <div>
          Delicious jumbo burger with all the fixings! new Delicious jumbo
          burger with all the fixings! good Delicious jumbo burger with all the
          fixings! Delicious jumbo burger with all the fixings!
        </div>
      </div>

      {/* feed backs  */}
      <div className="px-6 mt-5">
        <div className="text-lg font-bold text-zinc-700 mb-1">Feedbacks</div>
        <div className="feedback-con h-fit mb-22 flex flex-col gap-3">
          <FeedBackCard rate="5" comment="Nice taste i like it" />
          <FeedBackCard rate="4.5" comment="it feels like heaven" />
          <FeedBackCard
            rate="4"
            comment="The unmatched taste i have ever try, nice one you must try !!"
          />
          <FeedBackCard rate="3.5" comment="good food good mood" />
          <FeedBackCard rate="2" comment="just over hype" />
          <SeeMore />
        </div>
      </div>

      {/* bottom nav(add to cart & buy) */}
      <div className="fixed bottom-0 bg-zinc-100 left-0 w-full">
        <BottomActionBar price={finalPrice} />
      </div>
    </div>
  );
};

export default MealDetails;
