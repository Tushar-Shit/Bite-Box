import {Helmet} from "react-helmet-async";
import BottomBar from "../components/BottomBar";
import CustomNav from "../CategoryComponents/CustomNav";
import CategoryCards from "../CategoryComponents/CategoryCards";
import { useEffect, useState } from "react";

const Categories = () => {
  //extract all categories from DB
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
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
    <Helmet>
      <title>BiteBox | Categories</title>
    </Helmet>
      <CustomNav text="Categories" path="/" />

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
//everything is structured till 27.6.26