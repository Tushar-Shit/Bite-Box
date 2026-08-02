import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CustomNav from "../CategoryComponents/CustomNav";
import AllCount from "../context/allCount";
import FailedMessage from "../components/FailedMessage";

function Signup() {
  //UI variables
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { verifyCode, setVerifyCode, setContextEmail } = useContext(AllCount);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //show alert box if password not matched
    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      setFailed(true);
      setMessage("Password not matched.");
      return;
    }
    try {
      //request for an OTP
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        },
      );
      const data = await response.json();
      if (data.code === "failed") {
        setFailed(true);
        setMessage(data.message);
        return;
      }
      sessionStorage.setItem("username", formData.username);
      setContextEmail(formData.email);
      sessionStorage.setItem("password", formData.password);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setVerifyCode("SIGNUP");
      navigate("/verify-email", {
        state: "ve",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  function proceed() {
    setFailed(false);
  }
  return (
    <>
      <Helmet>
        <title>BiteBox | Signup</title>
      </Helmet>
      <CustomNav text="Signup" path="/" />

      {failed && (
        <FailedMessage
          heading="Signup Failed"
          message={message}
          reset={proceed}
        />
      )}

      <div className="h-[86vh] flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your name"
                value={formData.username}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
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
                className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-3 rounded-lg  
              ${loading ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer bg-orange-600 hover:bg-red-700"}
              `}
            >
              {loading ? "Processing..." : "Signup"}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            Already have an account?{"  "}
            <Link to="/login" className="text-red-700 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
