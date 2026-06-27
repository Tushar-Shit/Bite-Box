import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
import HorizontalFc from "../components/HorizontalFC";
import { Heartclick } from "../atomic/atomic";
import { useState, useEffect } from "react";

const Favorite = () => {

  //extract all favourite food items
  const [favouriteItems, setFavouriteItems] = useState([]);
  useEffect(() => {
    const favdata = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/favourite`,
        {
          credentials: "include",
        },
      );
      const { favourites } = await response.json();
      setFavouriteItems(favourites);
    };
    favdata();
  }, []);

  return (
    <>
      <CustomNav text="Favorite Items" />
      <div className="container h-[80vh] overflow-y-auto flex flex-col p-2">
        {favouriteItems.map((item) => (
          <HorizontalFc
            key={item._id}
            image={item.image}
            name={item.name}
            description={item.description}
            quantity={item.quantity}
            price={item.price}
            unit={item.unit}
            id={item._id}
            isFav={favouriteItems.some((food) => food._id === item._id)}
          />
        ))}
      </div>
      <BottomBar />
    </>
  );
};

export default Favorite;
//everything is structured till 27.6.26