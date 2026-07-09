import React from "react";
import SubTitle from "./atomic"
import { Link } from "react-router-dom";

const Subheadsee = ({ subHeading, path }) => {
    // console.log(data);
  return (
    <div className="flex px-4 my-3 justify-between">
      <SubTitle title={subHeading}/>
      <Link to={path} className="text-red-500 text-md">
        See more
      </Link>
    </div>
  );
};

export default Subheadsee;
