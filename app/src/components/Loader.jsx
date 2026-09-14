import React from "react";

const Loader = ({ message = "Please wait a bit..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-xl h-100 mx-auto text-center overflow-hidden">
      {/* 🛠️ Creative Cooking Stage */}
      <div className="relative w-52 h-52 mb-5 flex items-center justify-center mx-auto">
        {/* Rising Steam */}
        <div className="absolute top-3 left-[48%] -translate-x-1/2 flex gap-2 z-10">
          <div
            className="w-1.5 h-5 bg-orange-200 rounded-full blur-[0.5px]
      animate-[steam_1.4s_ease-in-out_infinite]"
          />

          <div
            className="w-1.5 h-7 bg-orange-300 rounded-full blur-[0.5px]
      animate-[steam_1.4s_ease-in-out_infinite_0.3s]"
          />

          <div
            className="w-1.5 h-5 bg-orange-200 rounded-full blur-[0.5px]
      animate-[steam_1.4s_ease-in-out_infinite_0.6s]"
          />
        </div>

        {/* 🔥 Flipping Food - slightly LEFT */}
        <div
          className="
      absolute
      left-[32%]
      bottom-18
      w-14 h-14
      bg-linear-to-tr from-orange-500 to-amber-400
      rounded-tr-full rounded-bl-full
      shadow-md
      z-20
      animate-[foodFlip_1.4s_ease-in-out_infinite]
    "
        />

        {/* 🍳 PAN - slightly RIGHT */}
        <div
          className="
      absolute
      left-[22%]
      bottom-10
      flex items-center
      origin-right
      z-10
      animate-[panToss_1.4s_ease-in-out_infinite]
    "
        >
          {/* Pan Body */}
          <div
            className="
      w-33 h-7
      bg-slate-800
      rounded-b-2xl
      border-t-2 border-slate-700
      relative
      shadow-md
    "
          >
            {/* Pan Rim */}
            <div
              className="
        absolute
        inset-x-0
        -top-1
      
        h-1
        bg-slate-600
        rounded-full
      "
            />
          </div>

          {/* Pan Handle */}
          <div
            className="
      w-23 h-3
      bg-linear-to-r from-slate-800 to-slate-900
      rounded-r-full
      -ml-1
      shadow-md
    "
          />
        </div>

        {/* 🔥 Burner - directly BELOW pan */}
        <div
          className="
      absolute
      left-[48%]
      translate-x-[42%]
      bottom-5
      w-28 h-2
      bg-linear-to-r
      from-orange-500
      via-amber-400
      to-transparent
      rounded-full
      blur-[3px]
      z-0
      animate-pulse
    "
        />
      </div>

      {/* 📝 Context Text */}
      <h4 className="text-lg font-extrabold text-slate-600 tracking-tight mb-1">
        Something is cooking...
      </h4>
      <p className="text-[15px] text-slate-400 font-medium px-6 leading-relaxed">
        {message}
      </p>

      {/* 💉 Custom Keyframe Animations */}
      <style>{`
  @keyframes panToss {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }

    30% {
      transform: translateY(6px) rotate(-7deg);
    }

    40% {
      transform: translateY(-5px) rotate(5deg);
    }

    60% {
      transform: translateY(0) rotate(0deg);
    }
  }

  @keyframes foodFlip {
    0%, 100% {
      transform: translateY(0) rotate(0deg) scale(1);
      opacity: 0.9;
    }

    30% {
      transform: translateY(3px) scaleY(0.8);
    }

    45% {
      opacity: 1;
    }

    50% {
      transform: translateY(-65px) rotate(180deg) scale(1.15);
    }

    75% {
      transform: translateY(-15px) rotate(270deg) scale(0.95);
    }
  }

  @keyframes steam {
    0% {
      transform: translateY(15px) scaleX(1);
      opacity: 0;
    }

    40% {
      transform: translateY(0) scaleX(1.3);
      opacity: 0.6;
    }

    100% {
      transform: translateY(-25px) scaleX(0.5);
      opacity: 0;
    }
  }
`}</style>
    </div>
  );
};

export default Loader;
