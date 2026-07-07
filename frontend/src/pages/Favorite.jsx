import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
import HorizontalFc from "../components/HorizontalFC";
import { Heartclick } from "../atomic/atomic";
import { useState, useEffect } from "react";
import image from "../assets/image_18fcf3e6.png";

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
        <div className="border w-full h-10/12 flex items-center justify-center relative">
          <div className="flex flex-col items-center relative">
            <p className="text-4xl font-bold absolute top-8 ">OOPS!</p>
            <img src={image} alt="" className="" />
            <p className="text-2xl font-bold absolute bottom-7">
              No Data Found!
            </p>
          </div>
        </div>
      ) : (
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
      )}

      <BottomBar />
    </div>
  );
};

export default Favorite;