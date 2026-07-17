import CustomNav from "../CategoryComponents/CustomNav";
import CartCard from "../components/CartCard";
import BottomBar from "../components/BottomBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Nodata from "../components/NoData";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loader, setLoader] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    // Fetch cart items from the backend when the component mounts
    async function fetchCartItems() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/cart`, {
          method: "GET",
          credentials: "include",
        });
        const cartData = await res.json();
        if (cartData) {
          setCartItems(cartData);
          setLoader(false);
        }
        const total = cartData.reduce((acc, item) => {
          return acc + item.price;
        }, 0);
        setTotalPrice(total);
      } catch (e) {
        console.log(e);
      }
    }
    fetchCartItems();
  }, [cartItems]);

  return (
    <div className="h-screen w-full relative">
      <CustomNav text="My Cart" />

      {/* loder until data is fetched */}
      {loader && <Loader />}

      {!cartItems || cartItems.length === 0 ? (
        <Nodata text1="OOPS!" text2="No Data Found!" />
      ) : (
        <>
          <div className="my-3 px-3 flex flex-col gap-4">
            {cartItems.map((item) => (
              <CartCard
                key={item.foodId._id}
                id={item.foodId._id}
                image={item.foodId.image}
                name={item.foodId.name}
                defaultQuantity={item.foodId.quantity}
                unit={item.foodId.unit}
                defaultPrice={item.foodId.price}
                foodUnit={item.quantity}
                totalPrice={item.price}
              />
            ))}
          </div>
          <div className="w-[90%] h-fit mx-auto p-2 mb-2 px-5 bg-zinc-300 rounded-xl flex flex-col">
            <div className="flex items-center justify-between text-xl font-bold my-3">
              <h2>Total</h2>
              <h4>{totalPrice}</h4>
            </div>
            <hr className="" />
            <Link
              to="/"
              className="bg-orange-500 py-2 mt-3 mb-1 text-center rounded-4xl text-lg font-bold text-white"
            >
              Proceed To CheckOut
            </Link>
          </div>
          <div className="h-12 w-full">
            <div className="h-12 w-full px-5 py-2 bg-zinc-300 fixed bottom-18 flex justify-between items-center">
              <p className="font-bold text-2xl">{totalPrice}</p>
              <p className="w-3/7 p-1 text-center rounded-md bg-amber-500">
                Place Order
              </p>
            </div>
          </div>
        </>
      )}

      <BottomBar />
    </div>
  );
};

export default Cart;
