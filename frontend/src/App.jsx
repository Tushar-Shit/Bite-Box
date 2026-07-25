import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Favorite from "./pages/Favorite";
import MealDetails from "./pages/MealDetails";
import ItemList from "./pages/ItemList";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import React from "react";
import HelpingPage from "./pages/HelpingPage";
import Order from "./pages/Order";
import Testingpage from "./pages/testingpage";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userinfo" element={<UserProfile />} />
        <Route path="/orders" element={<Order />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:items" element={<ItemList />} />
        <Route path="/tag/:anything" element={<ItemList />} />

        <Route path="/favorite" element={<Favorite />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path="/cart" element={<Cart />} />

        {/* email & password change */}
        <Route path="/help" element={<HelpingPage/>}/>

        
        {/* for test and development purpose */}
        <Route path="/test" element={<Testingpage />} />
        {/* <Route path="/categories/:items/:id" element={<MealDetails />} /> */}
      </Routes>
    </div>
  );
};

export default App;
