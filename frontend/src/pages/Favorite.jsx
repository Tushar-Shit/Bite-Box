import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
import FavouriteFc from "../components/FavouriteFc";
import { Heartclick } from "../atomic/atomic";
import { ShortMsg } from "../components/MessageBar";
import { useState, useEffect, useContext } from "react";
import Nodata from "../components/NoData";
import Loader from "../components/Loader";
import AllCount from "../context/allCount";
import { Helmet } from "react-helmet-async";

const Favorite = () => {
  const { favCount, setFavCount, cartCount, setCartCount, user, setUser } =
    useContext(AllCount);

  const [loader, setLoader] = useState(true);
  const [response, setResponse] = useState({
    quick: "Login Required",
    message: "Login to access more",
  });

  //extract all favourite food items
  const [favouriteItems, setFavouriteItems] = useState([]);
  useEffect(() => {
    // Guest user favorite foods
    if (!user || !user.userName) {
      const favData = JSON.parse(sessionStorage.getItem("fav")) || [];
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
        setResponse({
          quick: favourites.quick,
          message: favourites.message,
        });
        return;
      }
      if (favourites) {
        setFavouriteItems(favourites);
        setLoader(false);
        setFavCount(favourites.length);
      }
    };
    favdata();
  }, [user, favCount]);

  //update bottom bar
  const [msg, setMsg] = useState(null);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (!msg) return;
    const timer = setTimeout(() => {
      setMsg(null);
    }, 2000); // 3 seconds
    return () => clearTimeout(timer);
  }, [msg]);

  function satisfymessage(text) {
    setMsg(text);
  }

  return (
    <div className="h-screen w-full">
      <Helmet>
        <title>BiteBox | Your choice our recomendation</title>
      </Helmet>
      <CustomNav text="Favorite Items" />
      {msg && <ShortMsg message={msg} />}

      {loader && <Loader />}

      {favouriteItems.length <= 0 && !loader ? (
        <Nodata text1="No Item!" text2="Hurry Up Catch Favourites!" />
      ) : (
        <div className="px-4 pt-4 sm:flex sm:flex-wrap sm:gap-4">
          {favouriteItems.map((item) => (
            <FavouriteFc
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              description={item.description}
              servingQuantity={item.servingQuantity}
              quantity={item.quantity}
              price={item.price}
              unit={item.unit}
              isFav={favouriteItems.some((food) => food._id === item._id)}
              available={item.available}
              satisfymessage={satisfymessage}
              //design purpose
              view={"list"}
            />
          ))}
        </div>
      )}

      <BottomBar />
    </div>
  );
};

export default Favorite;
