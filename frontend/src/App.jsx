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

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userinfo" element={<UserProfile/>}/>
        <Route path="/help" element={<HelpingPage/>}/>
        
        <Route path="/categories" element={<Categories />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/categories/:items" element={<ItemList />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path="/type/:anything" element={<ItemList />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/categories/:items/:id" element={<MealDetails />} />
      </Routes>
    </div>
  );
};

export default App;
