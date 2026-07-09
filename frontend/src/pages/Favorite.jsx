import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
import HorizontalFc from "../components/HorizontalFC";
import { Heartclick } from "../atomic/atomic";
import { useState, useEffect } from "react";
import Nodata from "../components/NoData";

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
  }, [favouriteItems]);

  return (
    <div className="h-screen w-full">
      <CustomNav text="Favorite Items" />
      {!favouriteItems || favouriteItems.length === 0 ? (
        <Nodata text1="No Item!" text2="Hurry Up Catch Favourites!" />
      ) : (
        <div className="container overflow-y-auto flex flex-col pt-4">
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
      )}

      <BottomBar />
    </div>
  );
};

export default Favorite;