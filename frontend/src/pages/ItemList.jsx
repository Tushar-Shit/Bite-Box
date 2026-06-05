import SquareFc from "../components/SquareFC";
import BottomBar from "../components/BottomBar";
import CustomNav from "../CategoryComponents/CustomNav";
import HorizontalFC from "../components/HorizontalFC";
const para =
  "Chicken Biryani is an aromatic, flavorful South Asian dish. It features tender, spiced, marinated chicsdrfeg sfrgvd gxhsys";
const data = {
  heroImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzvMyociTNf4UqFHzh5Iu5503ne7cfJkLbg&s",
  text: "Sink your teeth into the juiciest, flavor-packed bite your cravings have been waiting for.",
};

const ItemList = () => {
  return (
    <>
      <CustomNav text="All Chicken Items" />
      <div className="p-4 flex flex-col mb-18">
        <HorizontalFC para={para} item="Paneer Tikka" image={data.heroImage} />
        <HorizontalFC para={para} item="Paneer Tikka" image={data.heroImage} />
        <HorizontalFC para={para} item="Paneer Tikka" image={data.heroImage} />
        <HorizontalFC para={para} item="Paneer Tikka" image={data.heroImage} />
        <HorizontalFC para={para} item="Paneer Tikka" image={data.heroImage} />
      </div>
      <BottomBar />
    </>
  );
};

export default ItemList;
