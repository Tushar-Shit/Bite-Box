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
const cart = require("./models/cart");
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
    origin: ["http://10.23.245.131:5173",
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


app.post("/user/cart", async (req, res) => {
  const MAX_ITEMS = 15;
  const { FId, FQuantity, FPrice, command } = req.body;
  const token = req.cookies.token;


  //return if foodId or Token not comes
  if (!FId || !token) return res.status(404).json({
    message: "Incorrect Data",
  });;
  //decode token to get the user id
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUserId = decoded.userId;


  const existingCart = await cart.findOne({ userId: currentUserId });
  if (existingCart) {
    if (existingCart.items.length >= MAX_ITEMS) {
      return res.status(400).json({
        message: "Cart is full",
      });
    }
    //extract the exact food item among all cart items
    const item = existingCart.items.find(
      item => item.foodId.toString() === FId.toString()
    );

    if (item) {
      if (command.trim() === "add/dlt") {
        existingCart.items.pull({ foodId: FId })
        await existingCart.save();
        return res.json({ message: "Removed from Cart" });
      }
      else if (command.trim() === "increase") {
        item.quantity += 1;
        item.price = FPrice * item.quantity;
        await existingCart.save();
        return res.json({ message: "Number Increased" });
      }
      else if (command.trim() === "decrease") {
        if (item.quantity <= 1) {
          item.quantity = 1;
          item.price = FPrice * item.quantity;
        }
        item.quantity -= 1;
        item.price = FPrice;
        await existingCart.save();
        return res.json({ message: "Number Decreased" });
      }
    } else {
      existingCart.items.push({
        foodId: FId,
        quantity: 1,
        price: FPrice
      });
    }
    await existingCart.save();
    return res.json({ message: "Added to Cart" });
  }

  //if user has not any cart yet
  const cartItem = await cart.create({
    userId: currentUserId,
    items: [
      {
        foodId: FId,
        quantity: 1,
        price: FPrice
      }
    ]
  });
  // res.json({ message: "Added to Cart" });
})

app.get("/user/cart", async (req, res) => {
  const token = req.cookies.token;
  //return if foodId or Token not comes
  if (!token) return res.status(404).json({
    message: "Incorrect Data",
  });;
  //decode token to get the user id
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUserId = decoded.userId;
  const data = await cart.findOne({ userId: currentUserId }).populate("items.foodId");
  // console.log(data.items);
  res.json(data.items);
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
