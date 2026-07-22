import CustomNav from "../CategoryComponents/CustomNav";
import CartCard from "../components/CartCard";
import BottomBar from "../components/BottomBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Nodata from "../components/NoData";
import { ShortMsg } from "../components/MessageBar";
const Cart = () => {
  const df = JSON.parse(sessionStorage.getItem("cart"));
  console.log(df);
  const [loggedin, setLoggedin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loader, setLoader] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [response, setResponse] = useState({
    quick: "initial",
    message: "Login to access more",
  });
  const [backendCode, setBackendCode] = useState(null);

  //extracting cart items
  const fetchCartItems = async () => {
    setLoader(true);

    //if user not logged in
    const user = JSON.parse(sessionStorage.getItem("user"));
    setLoggedin(user);
    if (user === false) {
      let preCart = JSON.parse(sessionStorage.getItem("cart")) || [];
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
        // setBackendCode(cartData.code)
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
  };
  //initially load cart items and stop loader after 6 second
  useEffect(() => {
    fetchCartItems();
    setTimeout(() => {
      setLoader(false);
    }, 6000);
  }, []);

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

      {/* loder until data is fetched */}
      {loader ? (
        <Loader />
      ) : !loader && cartItems.length <= 0 ? (
        <Nodata text1={response.quick} text2={response.message} />
      ) : null}

      {cartItems.length > 0 && (
        <>
          <div className="my-3 px-3 flex flex-col gap-4">
            {cartItems.map((item) =>
              loggedin ? (
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
                  onClick={fetchCartItems}
                  satisfymessage={satisfymessage}
                />
              ) : (
                <CartCard
                  key={item._id}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  defaultQuantity={item.quantity}
                  unit={item.unit}
                  defaultPrice={item.price}
                  foodUnit={item.quantity}
                  // totalPrice={item.price}
                  // onClick={fetchCartItems}
                  satisfymessage={satisfymessage}
                />
              ),
            )}
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

      <BottomBar update={update} />
    </div>
  );
};

export default Cart;
