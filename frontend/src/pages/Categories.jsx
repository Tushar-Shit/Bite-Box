import React from "react";
import BottomBar from "../components/BottomBar";
import CustomNav from "../CategoryComponents/CustomNav";
import CategoryCards from "../CategoryComponents/CategoryCards";
import { Link } from "react-router-dom";
const Categories = () => {
  return (
    <>
      <CustomNav text="Categories" />

      <div className="flex flex-wrap justify-center gap-5 mt-5 mb-23">
        <CategoryCards />
        <CategoryCards/>
        <CategoryCards/>
        <CategoryCards/>
        <CategoryCards/>
        <CategoryCards/>
        <CategoryCards/>
        <CategoryCards/>
        <CategoryCards/>
        <CategoryCards/>
        <CategoryCards/>
        <CategoryCards/>
        </div>


      <BottomBar/>
    </>
  );
};

export default Categories;
