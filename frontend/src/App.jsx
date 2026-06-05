import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Favorite from "./pages/Favorite";
import MealDetails from "./pages/MealDetails";
import ItemList from "./pages/ItemList";
import React from "react";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/favorite" element={<Favorite/>} />
        <Route path="/mealdetails" element={<MealDetails/>} />
        <Route path="/categories/items" element={<ItemList/>} />
      </Routes>
    </div>
  );
};

export default App;
