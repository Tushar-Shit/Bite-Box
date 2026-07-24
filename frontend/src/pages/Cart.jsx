import CustomNav from "../CategoryComponents/CustomNav";
import CartCard from "../components/CartCard";
import BottomBar from "../components/BottomBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Nodata from "../components/NoData";
import { ShortMsg } from "../components/MessageBar";
const Cart = () => {
  // const df = JSON.parse(sessionStorage.getItem("cart"));
  // console.log(df);
  // sessionStorage.clear()

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
    async function fetchCartItems() {
      //if user not logged in
      const user = JSON.parse(sessionStorage.getItem("user"));
      setLoggedin(user); //for showing cartCard component
      if (user === false) {
        let preCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        if (preCart.length <= 0) {
          setResponse({
            quick: "No Data Found",
            message: "Your cart is empty....",
          });
        }
        setLoader(false);
        setCartItems(preCart);
        setTotalPrice(preCart.reduce((acc, item) => acc + item.price, 0));
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/cart`, {
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
  }, [refresh]);

  function reload() {
    setRefresh(!refresh);
  }
  const [msg, setMsg] = useState(null);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (!msg) return;

    const timer = setTimeout(() => {
      setMsg(null);
      setUpdate(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [msg]);

  function satisfymessage(text) {
    setMsg(text);
    setUpdate(true);
  }

  return (
    <div className="h-screen w-full relative">
      <CustomNav text="My Cart" />
      {msg && <ShortMsg message={msg} />}
      {loader && <Loader />}
      {cartItems.length > 0 ? (
        <>
          <div className="my-3 px-3 flex flex-col gap-4">
            {cartItems.map((item) => {
              // console.log(item._id)
              //backend structure is different and guest is different
              // so first have to check which one i have to work with

              return loggedin ? (
                <CartCard
                  key={item.foodId._id}
                  id={item.foodId._id}
                  image={item.foodId.image}
                  name={item.foodId.name}
                  servingQuantity={item.foodId.servingQuantity}
                  quantity={item.foodId.quantity}
                  unit={item.foodId.unit}
                  defaultPrice={item.foodId.price}
                  foodUnit={item.quantity}
                  totalPrice={item.price}
                  reload={reload}
                  satisfymessage={satisfymessage}
                />
              ) : (
                // {console.log()}
                <CartCard
                  key={item._id}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  defaultQuantity={item.quantity}
                  unit={item.unit}
                  defaultPrice={item.price}
                  foodUnit={item.quantity}
                  totalPrice={item.price}
                  reload={reload}
                  satisfymessage={satisfymessage}
                />
              );
            })}
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
      ) : (
        <Nodata text1={response.quick} text2={response.message} />
      )}

      <BottomBar update={update} />
    </div>
  );
};

export default Cart;
