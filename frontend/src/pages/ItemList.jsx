import SquareFc from "../components/SquareFC";
import BottomBar from "../components/BottomBar";
import CustomNav from "../CategoryComponents/CustomNav";
import HorizontalFC from "../components/HorizontalFC";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { ShortMsg } from "../components/MessageBar";

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
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user === false) {
          const sessionFav = JSON.parse(sessionStorage.getItem("fav"));
          if (sessionFav) setFavFoods(sessionFav);
          else setFavFoods([]);
          return;
        }

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/user/favourite`,
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
  }, []);

  //update bottam bar when heart/cart tigger
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
  return (
    <>
      <Helmet>
        <title>
          {items ? `${items} | Category` : `${anything} | Category`}
        </title>
      </Helmet>
      <CustomNav text={items ? `All ${items} list` : `${anything}`} />
      {msg && <ShortMsg message={msg} />}
      <div className="px-4 pt-4 flex flex-col">
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
            satisfymessage={satisfymessage}
          />
        ))}
      </div>
      <BottomBar update={update} />
    </>
  );
};

export default ItemList;
