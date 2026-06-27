const express = require("express");
const app = express();
const port = process.env.PORT || 7000;
require('dotenv').config();
const cors = require("cors");
const mongoose = require("mongoose");
const Category = require("./models/categories");
const FoodItem = require("./models/foodItem");
const Reviews = require("./models/reviews");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("./models/user");
const cookieParser = require("cookie-parser");


//routes path
const categoryRoute = require("./routes/category");
const reviewRoute = require("./routes/reviews");
const authentication = require("./routes/auth");
const userRoute = require("./routes/user");


// mongodb connection
mongoose.connect(process.env.DB_URL)
  .then(() => console.log(" Successfully connected to MongoDB!"))
  .catch((err) => console.error(" MongoDB connection error:", err));


// middleware functions
app.use(
  cors({
    origin: ["http://localhost:5173",
      "https://bite-box-weld.vercel.app"]
    , credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());



// home route
app.get("/", async (req, res) => {
  const trendingFood = await FoodItem.find({ tag: "Trending" });
  const popularFood = await FoodItem.find({ tag: "Popular" });
  const chefChoiceFood = await FoodItem.find({ tag: "Chef's Choice" });
  const everything = {
    trendingFood,
    popularFood,
    chefChoiceFood
  }
  res.json(everything);
});

//multiple routes
app.use("/categories", categoryRoute);
app.use("/reviews", reviewRoute);
app.use("/auth", authentication);
app.use("/user", userRoute);

//route for popular, trending, recomendations
app.get("/tag/:anything", async (req, res) => {
  const { anything } = req.params;
  const fooditems = await FoodItem.find({ tag: anything });
  res.json({ fooditems });
});

app.get("/meal/:id", async (req, res) => {
  const { id } = req.params;
  const foodItem = await FoodItem.findById(id);
  const reviews = await Reviews.find({ food_belong: id });
  res.json({ foodItem, reviews });
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});