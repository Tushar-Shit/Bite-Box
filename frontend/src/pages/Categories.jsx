import { Helmet } from "react-helmet-async";
import Loader from "../components/Loader";
import BottomBar from "../components/BottomBar";
import CustomNav from "../CategoryComponents/CustomNav";
import CategoryCards from "../CategoryComponents/CategoryCards";
import { useEffect, useState } from "react";

const Categories = () => {
  //extract all categories from DB
  const [loaderState, setLoaderState] = useState(true);
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
        const data = await res.json();
        if (data) {
          setAllData(data);
          setLoaderState(false);
        }
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
      {loaderState && <Loader/>}
      <div className="flex flex-wrap justify-center gap-5 my-5">
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
