import React from "react";
import BottomBar from "../components/BottomBar";
import CustomNav from "../CategoryComponents/CustomNav";
import CategoryCards from "../CategoryComponents/CategoryCards";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Categories = () => {
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setAllData(data);
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  }, []);
  return (
    <>
      <CustomNav text="Categories" />

      <div className="flex flex-wrap justify-center gap-5 mt-5 mb-23">
        {allData.map((category) => (
          <CategoryCards
            key={category._id} // MongoDB unique ID required for React loops
            text={category.name}
            image={category.image}
            items={category.items}
          />
        ))}
      </div>

      <BottomBar />
    </>
  );
};

export default Categories;
