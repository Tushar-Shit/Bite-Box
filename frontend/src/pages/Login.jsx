import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CustomNav from "../CategoryComponents/CustomNav";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      //merge session data and DB data
      if (data.message.startsWith("Welcome")) {
        const sessionFav = JSON.parse(sessionStorage.getItem("fav")) || [];
        const sessionCart = JSON.parse(sessionStorage.getItem("cart")) || [];

        // const favResponse = await fetch(
        //   `${import.meta.env.VITE_API_URL}/user/addfav`,
        //   {
        //     method: "POST",
        //     credentials: "include",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       foodId: sessionFav,
        //     }),
        //   },
        // );
        // const { message } = await favResponse.json();
        // if (message === "Add to Favourite") {
        //   sessionStorage.removeItem("fav");
        // }
        // console.log(message);

        const cartDetails = sessionCart.map((item) => ({
          id: item._id,
          quantity: item.quantity,
        }));
        console.log(cartDetails);
        const cartResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/user/cart`,
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
        const { message } = await cartResponse.json();
        // if (message === "Added to Cart") {
          sessionStorage.removeItem("fav");
        // }
      }
      setFormData({
        email: "",
        password: "",
      });

      navigate("/", {
        state: { message: data.message },
      });

      // window.location.reload(); //forcefully reload the page after login
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Helmet>
        <title>BiteBox | Login</title>
      </Helmet>

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
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-red-700"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            Don't have any account?{"  "}
            <a href="/signup" className="text-red-700 font-medium">
              SignUp
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
