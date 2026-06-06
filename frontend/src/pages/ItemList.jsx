import SquareFc from "../components/SquareFC";
import BottomBar from "../components/BottomBar";
import CustomNav from "../CategoryComponents/CustomNav";
import HorizontalFC from "../components/HorizontalFC";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const para =
  "Chicken Biryani is an aromatic, flavorful South Asian dish. It features tender, spiced, marinated chicsdrfeg sfrgvd gxhsys";
const data = {
  heroImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzvMyociTNf4UqFHzh5Iu5503ne7cfJkLbg&s",
  text: "Sink your teeth into the juiciest, flavor-packed bite your cravings have been waiting for.",
};

const ItemList = () => {
  const [fooddata, setFoodData] = useState([]);
  const { items } = useParams();
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`/api/categories/${items}`);
        const { fooditems } = await res.json();
        setFoodData(fooditems);

        // setAllData(data);
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  }, []);
 
  return (
    <>
      <CustomNav text="All Chicken Items" />
      <div className="p-4 flex flex-col mb-18">
        {fooddata.map((item) => (
          <HorizontalFC
            key={item._id} // MongoDB unique ID required for React loops
            name={item.name}
            image={item.image}
            path={`/categories/${items}/${item._id}`}
            description={item.description}
          />
        ))}
      </div>
      <BottomBar />
    </>
  );
};

export default ItemList;
