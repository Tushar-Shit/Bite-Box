import CustomNav from "../CategoryComponents/CustomNav";
import CartCard from "../components/CartCard";
import BottomBar from "../components/BottomBar";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AllCount from "../context/allCount";
import Loader from "../components/Loader";
import Nodata from "../components/NoData";
import { ShortMsg } from "../components/MessageBar";
import { Helmet } from "react-helmet-async";

const Cart = () => {
  const { cartCount, setCartCount, user, setUser } = useContext(AllCount);

  const [refresh, setRefresh] = useState(false);
  const [loggedin, setLoggedin] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loader, setLoader] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [response, setResponse] = useState({
    quick: "No Data Found",
    message: "Your cart is empty..!",
  });

  //extracting cart items
  useEffect(() => {
    if (!user || !user.userName) {
      let preCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      if (preCart.length <= 0) {
        setResponse({
          quick: "No Data Found",
          message: "Your cart is empty....",
        });
      }
      setLoader(false);
      setCartItems(preCart);
      const eachFinalPrice = preCart.map((item) => item.price * item.quantity);
      setTotalPrice(eachFinalPrice.reduce((acc, price) => acc + price, 0));
      return;
    }

    async function fetchCartItems() {
      setLoggedin(user);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/update/cart`, {
          credentials: "include",
        });
        const cartData = await res.json();
        //no-login,  no-data,  no-user
        if (["NL", "ND", "NU"].includes(cartData.code)) {
          setCartItems([]);
          setTotalPrice(0);
          setResponse(cartData);
          setLoader(false);
          return;
        }
        setCartItems(cartData);
        setTotalPrice(cartData.reduce((acc, item) => acc + item.price, 0));
      } catch (err) {
        console.error(err);
      } finally {
        setLoader(false);
      }
    }

    fetchCartItems();
  }, [cartCount, refresh, user]);

  const [msg, setMsg] = useState(null);
  useEffect(() => {
    if (!msg) return;
    const timer = setTimeout(() => {
      setMsg(null);
      setRefresh(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [msg]);

  function satisfymessage(text) {
    setMsg(text);
    setRefresh(!refresh);
  }
  return (
    <div className="h-screen w-full relative flex flex-col">
      <Helmet>
        <title>BiteBox | Your cart where every item with minimum charges</title>
      </Helmet>

      <CustomNav text="My Cart" />

      {msg && <ShortMsg message={msg} />}

      {loader ? (
        <Loader />
      ) : cartItems.length > 0 ? (
        <main className="flex-1 flex flex-col overflow-y-auto scrollbar-none md:flex-row md:justify-center md:gap-4 md:px-6 md:py-5 md:overflow-hidden">
          {/* Cart Items */}
          <div
            className="
    w-full
    lg:max-w-140
    px-2 py-3
    flex flex-col gap-4
    md:flex-1
    md:max-w-3xl
    md:overflow-y-auto
    md:scrollbar-none
  "
          >
            {cartItems.map((item) =>
              loggedin ? (
                <CartCard
                  key={item.foodId._id}
                  id={item.foodId._id}
                  image={item.foodId.image}
                  name={item.foodId.name}
                  servingQuantity={item.foodId.servingQuantity}
                  defaultQuantity={item.foodId.quantity}
                  unit={item.foodId.unit}
                  defaultPrice={item.foodId.price}
                  foodUnit={item.quantity}
                  totalPrice={item.price}
                  available={item.foodId.available}
                  satisfymessage={satisfymessage}
                />
              ) : (
                <CartCard
                  key={item._id}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  servingQuantity={item.servingQuantity}
                  defaultQuantity={item.quantity}
                  unit={item.unit}
                  defaultPrice={item.price}
                  foodUnit={item.quantity}
                  totalPrice={item.price}
                  available={item.available}
                  satisfymessage={satisfymessage}
                />
              ),
            )}
          </div>

          {/* Order Summary */}
          <aside
            className=" mx-5  mb-17 md:mx-0 md:mb-0 md:flex md:w-87.5 lg:w-100  md:flex-col
        bg-zinc-200 rounded-xl p-5 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-5">Order Summary</h2>

            <div className="flex-1 overflow-y-auto scrollbar-none space-y-3">
              {cartItems.map((item) =>
                loggedin ? (
                  <SummaryDetails
                    name={item.foodId.name}
                    price={item.price }
                  />
                ) : (
                  <SummaryDetails
                    name={item.name}
                    price={item.price}
                  />
                ),
              )}
            </div>

            <div className=" border-t pt-4">
              <div className="flex justify-between items-center text-2xl font-bold mb-4">
                <h2>Total</h2>
                <h2>₹{totalPrice}</h2>
              </div>

              <button
                className="w-full bg-orange-500 hover:bg-orange-600
            text-white text-lg font-bold py-3 rounded-full transition"
              >
                Proceed To Checkout
              </button>
            </div>
          </aside>

          {/* Mobile Bottom Bar */}
          <div className="h-12 w-full md:hidden">
            <div
              className="fixed bottom-18 left-0 right-0 h-12
          bg-zinc-300 px-5 flex justify-between items-center"
            >
              <p className="font-bold text-2xl">₹{totalPrice}</p>

              <p className="w-3/7 p-2 text-center rounded-md bg-amber-500 font-semibold text-white">
                Place Order
              </p>
            </div>
          </div>
        </main>
      ) : (
        <Nodata text1={response.quick} text2={response.message} />
      )}

      <BottomBar />
    </div>
  );
};

const SummaryDetails = ({ name, price }) => {
  return (
    <p className="flex justify-between border-b pb-2 text-zinc-600">
      <span>{name}</span>
      <span>₹{price}.00</span>
    </p>
  );
};

export default Cart;
