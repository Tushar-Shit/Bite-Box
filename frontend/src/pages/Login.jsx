import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CustomNav from "../CategoryComponents/CustomNav";
import AllCount from "../context/allCount";
import FailedMessage from "../components/FailedMessage";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const { user, setUser } = useContext(AllCount);
  const [failed, setFailed] = useState(false);
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  //login function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      //merge session data and DB data after successfull login
      if (data.code === "failed") {
        setFailed(true);
        setMessage(data.message);
        return;
      }

      //set the user as true
      setUser({
        userId: data.user.userid,
        userName: data.user.username,
        userEmail: data.user.useremail,
        userRole: data.user.userrole,
      });

      const sessionFav = JSON.parse(sessionStorage.getItem("fav")) || [];
      const sessionCart = JSON.parse(sessionStorage.getItem("cart")) || [];

      const favResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/update/favourite`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            foodId: sessionFav,
          }),
        },
      );
      const {code, message } = await favResponse.json();
      if (code=== "okay") {
        sessionStorage.removeItem("fav");
      }

      const cartDetails = sessionCart.map((item) => ({
        id: item._id,
        quantity: item.quantity,
        available: item.available,
      }));
      // console.log(cartDetails);
      const cartResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/update/cart`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: cartDetails,
            command: "SCA", //Session Cart Add
          }),
        },
      );
      const cartData = await cartResponse.json();
      if (cartData.code === "success") {
        sessionStorage.removeItem("cart");
      }

      setFormData({
        email: "",
        password: "",
      });
      console.log(cartData.message);
      navigate("/", {
        state: { message: data.message },
      });

    } catch (error) {
      setUser(false);
      setFailed(true);
      setMessage("Something went worng, please try again");
      console.error(error);
    }
  };

  function reset() {
    setFailed(false);
    setMessage("");
    setProcessing(false);
  }

  return (
    <>
      <Helmet>
        <title>BiteBox | Login</title>
      </Helmet>
      {failed && (
        <FailedMessage heading="Login Failed" message={message} reset={reset} />
      )}

      <CustomNav text="Login" path="/" />
      <div className="h-[90vh] flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full ${processing ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-red-700 cursor-pointer"}  text-white py-3 rounded-lg`}
            >
              {processing ? "Processing..." : "Login"}
            </button>
          </form>
          <div className="w-full mt-3 flex justify-between items-baseline text-red-600">
            <div className="text-center text-sm text-gray-600">
              <span className="text-sm"> Don't have any account?&nbsp;</span>
              <Link to="/signup" className="text-red-700 font-medium">
                SignUp
              </Link>
            </div>
            <Link
              to="/help"
              state={"fp"}
              className="text-right text-red-500 cursor-pointer"
            >
              Forget password?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
