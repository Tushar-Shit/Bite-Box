import React from "react";
import {Link} from "react-router-dom";
const Categories = ({image, text}) => {
  // console.log(data);
  return (
    <Link to={`/categories/${text}`} className="w-[21%] bg-zinc-50 rounded-md flex flex-col items-center justify-center shadow-[0_0_4px_rgba(0,0,0,0.5)] ">
      <div className="h-[90%]">
        <img
          src={image}
          alt=""
          className=" h-full w-full object-cover rounded-t-md"
        />
      </div>
      <span>{text}</span>
    </Link>
  );
};

export default Categories;
