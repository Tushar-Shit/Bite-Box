import React from "react";

const Categories = (data) => {
  // console.log(data);
  return (
    <div className="w-[21%] h-fit bg-zinc-50 rounded-md flex flex-col items-center justify-center shadow-[0_0_4px_rgba(0,0,0,0.5)] ">
      <img src={data.image} alt="" className="object-contain rounded-t-md"/>
      <span>{data.text}</span>
    </div>
    

  );
};

export default Categories;
