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
import adminRoute from "./routes/admin.js";

//middleware
import checkAuth from "./middleware/authentication.js"
import errorHandler from "./middleware/errorHandler.js";
import Order from "./models/order.js";

const app = express();
const port = process.env.PORT || 7000;
//Database connection
connectDB();
// middleware functions
app.use(
  cors({
    origin: [
      "http://10.90.88.131:5173",
      "http://10.90.88.131:5174",
      "http://172.30.22.131:5173",
      "https://bite-box-ten.vercel.app"
    ]
    , credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());



// home route
app.get("/", async (req, res) => {
  try {
    const trendingFood = await FoodItem.find({ tag: "trending" }).limit(5).populate("rating");
    const popularFood = await FoodItem.find({ tag: "popular" }).limit(4).populate("rating");
    const recommendedFood = await FoodItem.find({ tag: "recommended" }).limit(4).populate("rating");
    const bestSellerFood = await FoodItem.find({ tag: "bestseller" }).limit(5).populate("rating");
    const chefChoiceFood = await FoodItem.find({ tag: "chefchoice" }).limit(4).populate("rating");

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
app.use("/admin", adminRoute);

//route for popular, trending, recomendations
app.get("/tag/:anything", async (req, res) => {
  const { anything } = req.params;
  const fooditems = await FoodItem.find({ tag: anything });
  res.json({ fooditems });
});

//meal details page's data
app.get("/meal/:id", async (req, res) => {
  const { id } = req.params;
  const foodItem = await FoodItem.findById(id)
  // .populate("rating");
  // console.log(foodItem)
  const ratings = await Reviews.find({ food_belong: id });
  const reviews = ratings.filter(item => item.comment);
  res.json({ foodItem, ratings, reviews });
})


//always gives the current date's data
app.get("/order", checkAuth, async (req, res) => {
  const user = req.user;
  const data = await Order.find({
    customerId: user
  }).sort({ createdAt: -1 });


  if (data.length === 0) { return res.json({ message: "No order yet" }); }
  res.json({ data })
})



app.post("/order", checkAuth, async (req, res) => {
  const { food,
    deliveryCharge,
    amount,
    finalAmount,
    customerName,
    mobile,
    location,
    paymentMode
  } = req.body;

  const date = new Date();
  const formattedDate =
    String(date.getDate()).padStart(2, "0") +
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getFullYear()).slice(-2);

  const lastFour = mobile.slice(-4);
  const random = Math.floor(Math.random() * 100) + 1;
  const orderId = `${formattedDate}-${random}-${lastFour}`

  // const paymentMode = "online";
  const status = "Pending"
  const what = Order.create({
    items: food, customerId: req.user, orderId, status,
    deliveryCharge, amount,
    finalAmount, customerName,
    mobile, location, paymentMode
  });
  // console.log(food);
  res.json({
    message: "Your order has been placed successfully."
  })

})

//get order by orderId
app.get("/order/status/:orderId", async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);
  const order = await Order.findOne({ orderId });
  res.json({ order });
});

//update order status
app.patch("/order/status/:orderId", async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId)
  const { status } = req.body;

  const order = await Order.findOneAndUpdate({ orderId }, { status }, { after: true });
  console.log(order)
  res.json({ order, message: "order cancelled successfully" });
});

// for keep alive the backend in render



app.get("/health", async (req, res) => {
  console.log("hello");
  return res.status(200).json({ code: "success", message: "Active successfull." });
})

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
