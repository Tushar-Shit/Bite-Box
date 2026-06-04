import React from "react";

const HeroImage = (data) => {
  //   console.log(data);
  return (
    <div className="flex items-center gap-1 w-[90%] shrink-0 p-4 relative bg-orange-500 rounded-md">
      <div className="w-[35%] border">
        <img src={data.heroImage} alt="" className="w-full h-full"/>
      </div>
      <div className="flex flex-col w-[65%] items-center">
        <h1 className="font-bold text-3xl mb-2">Our Best Seller!</h1>
        <p className="text-center mb-5">{data.text}</p>
        <button className="bg-zinc-100 p-2 rounded-md absolute right-4 bottom-3">Order Now</button>
      </div>
    </div>
  );
};

export default HeroImage;
