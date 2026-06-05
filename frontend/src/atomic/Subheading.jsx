import React from "react";
import SubTitle from "./atomic"


const Subheadsee = (data) => {
    // console.log(data);
  return (
    <div className="flex px-4 my-3 justify-between ">
      <SubTitle data={data.heading}/>
      <span className="text-red-500 text-md">See more</span>
    </div>
  );
};

export default Subheadsee;
