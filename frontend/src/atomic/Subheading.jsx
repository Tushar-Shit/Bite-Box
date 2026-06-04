import React from "react";

const Subheading = (data) => {
//   console.log(data);
  return (
    <div className="flex px-4 my-3 justify-between ">
      <span className="text-gray-900 text-[1.25rem]">
        <b>{data.heading}</b>
      </span>
      <span className="text-red-500 text-md">See more</span>
    </div>
  );
};

export default Subheading;
