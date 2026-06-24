import CustomNav from "../CategoryComponents/CustomNav";
import CartCard from "../components/CartCard";
import BottomBar from "../components/BottomBar";
import {Link} from "react-router-dom";
const Cart = () => {
  return (
    <div>
      <CustomNav text="My Cart" />
      <div className="my-3 px-5 flex flex-col gap-4">
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
      </div>
      <div className="w-[90%] h-fit mx-auto mb-22 py-2 px-5 bg-zinc-300 rounded-xl flex flex-col">
        <div className="flex items-center justify-between text-xl font-bold my-3">
          <h2>Total</h2>
          <h4>1000</h4>
        </div>
        <hr className=""/>
        <Link to="/" className="bg-orange-500 py-2 mt-3 mb-1 text-center rounded-4xl text-lg font-bold text-white">
          Proceed To CheckOut
        </Link>
      </div>

      <BottomBar />
    </div>
  );
};

export default Cart;
