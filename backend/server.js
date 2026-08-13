import dotenv from "dotenv";
dotenv.config();

//necessary components
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

//models
import Category from "./models/categories.js";
import FoodItem from "./models/foodItem.js";
import Reviews from "./models/reviews.js";
import Users from "./models/user.js";
import Cart from "./models/cart.js";

// Routes
import authentication from "./routes/auth.js";
import categoryRoute from "./routes/category.js";
import reviewRoute from "./routes/reviews.js";
import userRoute from "./routes/user.js";
import updateRoute from "./routes/update.js";

//middleware
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const port = process.env.PORT || 7000;
//Database connection
connectDB();
// middleware functions
app.use(
  cors({
    origin: ["http://10.97.194.131:5173",
      "http://192.168.31.96:5173",
      "https://bite-box-weld.vercel.app"]
    , credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());



// home route
app.get("/", async (req, res) => {
  try {
    const trendingFood = await FoodItem.find({ tag: "trending" }).limit(5);
    const popularFood = await FoodItem.find({ tag: "popular" }).limit(4);
    const recommendedFood = await FoodItem.find({ tag: "recommended" }).limit(4);
    const bestSellerFood = await FoodItem.find({ tag: "bestseller" }).limit(5);
    const chefChoiceFood = await FoodItem.find({ tag: "chefchoice" }).limit(4);

    const everything = {
      trendingFood,
      popularFood,
      recommendedFood,
      bestSellerFood,
      chefChoiceFood
    }
    res.json(everything);
  } catch (err) {
    console.log(err);
  }
});

//multiple routes
app.use("/categories", categoryRoute);
app.use("/auth", authentication);
app.use("/user", userRoute);
app.use("/update", updateRoute);
app.use("/reviews", reviewRoute);

//route for popular, trending, recomendations
app.get("/tag/:anything", async (req, res) => {
  const { anything } = req.params;
  const fooditems = await FoodItem.find({ tag: anything });
  res.json({ fooditems });
});

//meal details page's data
app.get("/meal/:id", async (req, res) => {
  const { id } = req.params;
  const foodItem = await FoodItem.findById(id);
  const reviews = await Reviews.find({ food_belong: id });
  res.json({ foodItem, reviews });
})

//for keep alive the backend in render
app.get("/health", async (req, res) => {
  return res.status(200).json({ code: "success", message: "Active successfull." });
})

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
