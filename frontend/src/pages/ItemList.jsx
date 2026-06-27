import SquareFc from "../components/SquareFC";
import BottomBar from "../components/BottomBar";
import CustomNav from "../CategoryComponents/CustomNav";
import HorizontalFC from "../components/HorizontalFC";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { set } from "mongoose";

const ItemList = () => {
  //if user comes from categories page
  const { items } = useParams();
  //if user expand treding, popular, recomandation....
  const { anything } = useParams();

  //fetch all food data within a category or tag
  const [fooddata, setFoodData] = useState([]);
  const [favFoods, setFavFoods] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        //fetch standard categories
        if (items) {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/categories/${items}`,
          );
          const { fooditems } = await res.json();
          setFoodData(fooditems);
        }
        //fetch tag categories
        if (anything) {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/tag/${encodeURIComponent(anything)}`,
          );
          const { fooditems } = await res.json();
          setFoodData(fooditems);
        }
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/favourite`, {
          credentials: "include",
        });
        const { favourites } = await res.json();
        setFavFoods(favourites);
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  }, []);

  return (
    <>
      <CustomNav text={items ? `All ${items} list` : `All ${anything} list`} />
      <div className="p-4 flex flex-col mb-18">
        {fooddata.map((item) => (
          <HorizontalFC
            key={item._id} // MongoDB unique ID required for React loops
            image={item.image}
            name={item.name}
            description={item.description}
            quantity={item.quantity}
            price={item.price}
            unit={item.unit}
            id={item._id}
            isFav={favFoods.some((food) => food._id === item._id)}
          />
        ))}
      </div>
      <BottomBar />
    </>
  );
};

export default ItemList;
//everything is structured till 27.6.26