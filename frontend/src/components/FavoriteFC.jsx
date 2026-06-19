import { Heartclick } from "../atomic/atomic";
import { Link } from "react-router-dom";
const FavoriteFC = () => {
  return (
    <Link to="/mealdetails">
      <div className="bg-white-300 p-3 pr-2 mb-3 flex gap-3 items-center rounded-lg border-zinc-700">
        {/* food image  */}
        <div className="flex-2 h-full rounded-l-lg">
          <img
            className="w-full h-25 object-cover rounded-l-lg"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIn7-QAOsGZAT6c3BCKRgj36pM4eFSKrVi2A&s"
            alt=""
          />
        </div>
        {/* food name  */}
        <div className="flex-3 flex flex-col justify-center">
          <div className="flex justify-between">
            <span className="text-lg font-bold ">Mutton Maharaj</span>
            <Heartclick />
          </div>
          <div className="font-semibold text-md">
            6 piece
          </div>

          {/* price rating  */}
          <div className="flex justify-between text-md">
            <div className="flex gap-2">
              <span>
                <b className="text-zinc-700">₹100.000</b>
              </span>
              <span>🔥 4.3</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FavoriteFC;
