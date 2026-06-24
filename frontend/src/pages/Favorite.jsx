import CustomNav from "../CategoryComponents/CustomNav";
import BottomBar from "../components/BottomBar";
import FavoriteFC from "../components/FavoriteFC";
import { Heartclick } from "../atomic/atomic";
// import { Link } from "react-router-dom";
const Favorite = () => {
  return (
    <>
      <CustomNav text="Favorite Items" />
      <div className="container h-[77vh] overflow-y-auto flex flex-col p-2">
        <FavoriteFC />
        <FavoriteFC />
        <FavoriteFC />
        <FavoriteFC />
        <FavoriteFC />
        <FavoriteFC />
        <FavoriteFC />
        <FavoriteFC />
        <FavoriteFC />
        <FavoriteFC />
        <FavoriteFC />
        <FavoriteFC />
        <FavoriteFC />
      </div>
      <BottomBar />
    </>
  );
};

export default Favorite;
