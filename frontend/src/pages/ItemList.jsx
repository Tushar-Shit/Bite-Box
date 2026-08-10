import SquareFc from "../components/SquareFC";
import BottomBar from "../components/BottomBar";
import CustomNav from "../CategoryComponents/CustomNav";
import HorizontalFC from "../components/HorizontalFC";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState, useContext } from "react";
import { ShortMsg } from "../components/MessageBar";
import AllCount from "../context/allCount";

const ItemList = () => {
  const { user, setUser } = useContext(AllCount);
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

        if (!user || !user.userName) {
          const sessionFav = JSON.parse(sessionStorage.getItem("fav")) || [];
          setFavFoods(sessionFav);
          return;
        }

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/update/favourite`,
          {
            credentials: "include",
          },
        );
        const { favourites } = await res.json();
        setFavFoods(favourites);
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  }, [user]);

  //update bottam bar when heart/cart tigger
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    if (!msg) return;

    const timer = setTimeout(() => {
      setMsg(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [msg]);

  function satisfymessage(text) {
    setMsg(text);
  }
  return (
    <div className="fixed inset-0 h-dvh flex flex-col">
      <Helmet>
        <title>
          {items ? `${items} | Category` : `${anything} | Category`}
        </title>
      </Helmet>
      <CustomNav text={items ? `All ${items} list` : `${anything}`} />
      {msg && <ShortMsg message={msg} />}
      <main className="flex-1 min-h-0 overflow-y-auto scrollbar-none">
        <div className="px-4 pt-4 sm:flex sm:flex-wrap sm:gap-4">
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
              available={item.available}
              satisfymessage={satisfymessage}
              //design purpose
              view={"list"}
            />
          ))}
        </div>
      </main>
      <BottomBar />
    </div>
  );
};

export default ItemList;
