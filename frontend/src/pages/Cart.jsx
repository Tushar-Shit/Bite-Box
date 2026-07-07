import CustomNav from "../CategoryComponents/CustomNav";
import CartCard from "../components/CartCard";
import BottomBar from "../components/BottomBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import image from "../assets/image_18fcf3e6.png";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
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
        setCartItems(cartData);
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
    <div className="h-screen w-full">
      <CustomNav text="My Cart" />
      {!cartItems || cartItems.length === 0 ? (
        <div className="w-full h-10/12 flex items-center justify-center relative">
          <div className="flex flex-col items-center relative">
            <p className="text-4xl font-bold absolute top-8 ">OOPS!</p>
            <img src={image} alt="" className="" />
            <p className="text-2xl font-bold absolute bottom-7">
              No Data Found!
            </p>
          </div>
        </div>
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
          <div className="w-[90%] h-fit mx-auto mb-22 py-2 px-5 bg-zinc-300 rounded-xl flex flex-col">
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
        </>
      )}
      <div className="h-0.5">
        <BottomBar />
      </div>
    </div>
  );
};

export default Cart;
