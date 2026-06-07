import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
const FeedbackCard = ({ id, author, rating, like, unlike, comment }) => {
  // console.log(id);

  const [likes, setLikes] = useState(like);
  const [thumup, setThumup] = useState(false);
  const [thumdown, setThumdown] = useState(false);
  const likeIncrease = async () => {
    const newLikes = like + 1;
    setLikes(newLikes);
    setThumdown(true);
    try {
      await fetch(`/api/reviews/like/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        // Optional: Send a payload telling the backend what actions were performed
        body: JSON.stringify({
          totalLike: newLikes,
        }),
      });
    } catch (err) {
      console.error("Failed to sync upvote to backend database:", err);
      // Optional: Revert local state here if you want strict error handling
    }
  };
  // console.log(likes);

  const [unLikes, setUnLikes] = useState(unlike);
  const unLikeIncrease = async() => {
    const newUnLikes=unlike+1;
    setUnLikes(newUnLikes);
    setThumup(true);
    try {
      await fetch(`/api/reviews/unlike/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        // Optional: Send a payload telling the backend what actions were performed
        body: JSON.stringify({
          totalLike: newUnLikes,
        }),
      });
    } catch (err) {
      console.error("Failed to sync upvote to backend database:", err);
      // Optional: Revert local state here if you want strict error handling
    }
  };
  // console.log(unLikes);

  return (
    <div className="feedback-Card p-4 bg-zinc-100 rounded-2xl">
      <div className="flex justify-between items-center mb-2 pr-2">
        <div className="flex gap-3 justify-between items-center">
          <span className="font-bold text-lg text-zinc-500">
            {author.toUpperCase()}
          </span>
          <span>{rating}</span>
        </div>
        <div className="flex gap-3 justify-between items-center">
          {!thumdown && (
            <span className="flex flex-col justify-center items-center">
              {unlike !== unLikes ? (
                <ThumbsDown size={20} fill="black" />
              ) : (
                <ThumbsDown
                  size={20}
                  onClick={() => {
                    unLikeIncrease();
                  }}
                />
              )}
              <span className="text-[10px] m-0 p-0 text-red-700">
                {unLikes}
              </span>
            </span>
          )}
          {!thumup && (
            <span className="flex flex-col justify-center items-center ">
              {like !== likes ? (
                <ThumbsUp size={20} fill="black" />
              ) : (
                <ThumbsUp
                  size={20}
                  size={20}
                  onClick={() => {
                    likeIncrease();
                  }}
                />
              )}
              <span className="text-[10px] m-0 p-0 text-green-800">
                {likes}
              </span>
            </span>
          )}
        </div>
      </div>
      <div className="px-2 text-justify text-[15px]">{comment}</div>
    </div>
  );
};

export default FeedbackCard;
