import React from "react";
import { Star } from "lucide-react";
const FeedbackDashboard = ({
  avgRating,
  totalRating,
  fiveStar,
  fourStar,
  threeStar,
  twoStar,
  oneStar,
}) => {
  // console.log(avgRating, totalRating)
  return (
    <div className="border mx-3 p-2 bg-[#fff2d9cd] rounded-lg flex lg:mb-3">
      {/* left-side */}
      <div className="w-3/8 p-2 border-r flex flex-col items-center justify-center ">
        <div className="flex gap-2 items-center">
          <Star fill="#ff9d00" color="#ff9d00" />
          <span className="text-xl font-bold">{avgRating.toFixed(1)}</span>
        </div>
        <div className="">({totalRating} reviews)</div>
      </div>

      {/* right-side */}
      <div className="w-5/8 flex flex-col justify-center gap-2 px-3 lg:gap-0">
        <StarPercentage count={5} percentage={((fiveStar/totalRating)*100).toFixed(1)} />
        <StarPercentage count={4} percentage={((fourStar/totalRating)*100).toFixed(1)} />
        <StarPercentage count={3} percentage={((threeStar/totalRating)*100).toFixed(1)} />
        <StarPercentage count={2} percentage={((twoStar/totalRating)*100).toFixed(1)} />
        <StarPercentage count={1} percentage={((oneStar/totalRating)*100).toFixed(1)} />
      </div>
    </div>
  );
};

const StarPercentage = ({ count, percentage }) => {
  return (
    <div className="w-full flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        <span className="text-sm font-medium">{count}</span>
        <Star size={15} fill="#696969cd" color="#696969cd" />
      </div>
      <div className="flex-1 h-2.5 bg-zinc-300 rounded-full overflow-hidden lg:h-1.5">
        <div
          className="h-full bg-[#ffb703] rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-10 text-right text-sm text-zinc-600">
        {percentage}%
      </span>
    </div>
  );
};

export default FeedbackDashboard;
