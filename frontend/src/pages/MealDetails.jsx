import CustomNav from "../CategoryComponents/CustomNav";
import {BottomActionBar} from "../components/BottomBar";
import { Heartclick } from "../atomic/atomic";
import { ChevronRight } from "lucide-react";

const MealDetails = () => {
  return (
    <>
      <CustomNav text="Meal Details" />
      <div className="w-[83vw] h-[30vh] rounded-lg m-auto my-5">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzvMyociTNf4UqFHzh5Iu5503ne7cfJkLbg&s"
          alt=""
          className=" w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="px-10 border h-[15vh]">
        <div className="text-2xl text-extrabold">Jumbo Burger</div>
        <div>$63</div>
      </div>
      <div className="px-10 border h-[15vh]">
        <div className="text-lg">Description</div>
        <div>Delicious jumbo burger with all the fixings!</div>
      </div>

      <BottomActionBar/>
    </>
  );
};

export default MealDetails;
