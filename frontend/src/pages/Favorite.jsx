import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
import HorizontalFc from "../components/HorizontalFC";
import { Heartclick } from "../atomic/atomic";
import { ShortMsg } from "../components/MessageBar";
import { useState, useEffect } from "react";
import Nodata from "../components/NoData";
import Loader from "../components/Loader";

const Favorite = () => {
  const [loader, setLoader] = useState(true);
  const [response, setResponse] = useState({
    quick: "Login Required",
    message: "Login to access more",
  });
  //extract all favourite food items
  const [favouriteItems, setFavouriteItems] = useState(null);
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user === false) {
      const favData = JSON.parse(sessionStorage.getItem("fav"));
      const cartData = JSON.parse(sessionStorage.getItem("cart"));
      setFavouriteItems(favData);
      setLoader(false);
      return;
    }
    const favdata = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/favourite`,
        {
          credentials: "include",
        },
      );
      const { favourites } = await response.json();
      if (favourites.code === "NL") {
        setResponse(cartData);
        return;
      }
      if (favourites) {
        setFavouriteItems(favourites);
        setLoader(false);
      }
    };
    favdata();
  }, []);

  //update bottom bar
  const [msg, setMsg] = useState(null);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (!msg) return;

    const timer = setTimeout(() => {
      setMsg(null);
      setUpdate(false);
    }, 2000); // 3 seconds

    return () => clearTimeout(timer);
  }, [msg]);

  function satisfymessage(text) {
    setMsg(text);
    setUpdate(true);
  }
  // console.log(favouriteItems);

  return (
    <div className="h-screen w-full">
      <CustomNav text="Favorite Items" />
      {msg && <ShortMsg message={msg} />}

      {/* {loader && <Loader />}  */}

      {!favouriteItems ? (
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
              satisfymessage={satisfymessage}
            />
          ))}
        </div>
      )}

      <BottomBar update={update} />
    </div>
  );
};

export default Favorite;
