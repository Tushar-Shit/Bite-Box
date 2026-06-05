import {ThumbsDown, ThumbsUp } from "lucide-react";

const FeedbackCard = ({rate, comment}) => {

  return (
    <div className="feedback-Card p-4 bg-zinc-100 rounded-2xl">
      <div className="flex justify-between items-center mb-2 pr-2">
        <div className="flex gap-3 justify-between items-center">
          <span className="font-bold text-lg text-zinc-500">Tushar Shit</span>
          <span>{rate}</span>
        </div>
        <div className="flex gap-3 justify-between items-center">
          <ThumbsDown size={20} /> <ThumbsUp size={20} />
        </div>
      </div>
      <div className="px-2 text-justify text-[15px]">{comment}
      </div>
    </div>
  );
};

export default FeedbackCard;
