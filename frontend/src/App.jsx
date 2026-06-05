import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import MealDetails from "./pages/MealDetails";
import React from "react";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/mealdetails" element={<MealDetails/>} />
      </Routes>
    </div>
  );
};

export default App;
