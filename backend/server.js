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
const User = require("./models/user")
const cookieParser = require("cookie-parser");


//routes
const categoryRoute = require("./routes/category");
const reviewRoute = require("./routes/reviews");


mongoose.connect(process.env.DB_URL)
  .then(() => console.log(" Successfully connected to MongoDB!"))
  .catch((err) => console.error(" MongoDB connection error:", err));

app.use(
  cors({
    origin: ["http://localhost:5173",
      "https://bite-box-weld.vercel.app"]
    , credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());


app.get("/", async (req, res) => {
  const data =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzvMyociTNf4UqFHzh5Iu5503ne7cfJkLbg&s"
  const trendingFood = await FoodItem.find({ tag: "Trending" });
  const popularFood = await FoodItem.find({ tag: "Popular" });
  const chefChoiceFood = await FoodItem.find({ tag: "Chef's Choice" });
  // console.log(trendingFood);

  const everything = {
    data,
    trendingFood,
    popularFood,
    chefChoiceFood
  }
  res.json(everything);
});


app.get("/profile", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not logged in",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(
      decoded.userId
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
});


app.use("/categories", categoryRoute);
app.use("/reviews", reviewRoute);


app.get("/meal/:id", async (req, res) => {
  const { id } = req.params;
  const foodItem = await FoodItem.findById(id);
  // console.log(foodItem);
  const reviews = await Reviews.find({ food_belong: id });
  // console.log(reviews);

  res.json({ foodItem, reviews });
})


// Added "/api" to match your front-end fetch exactly
app.get("/type/:anything", async (req, res) => {
  const { anything } = req.params;
  console.log(anything);
  const fooditems = await FoodItem.find({ tag: anything });
  res.json({ fooditems });
});


app.post("/signup", async (req, res) => {
  // console.log("tygfhbcvfggtredsxzaw");
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    //extracting the newly registered user and make them login
    const newUser = await User.findOne({ email });
    const token = jwt.sign(
      {
        userId: newUser._id
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    const messageName = newUser.username.split(" ");
    res.status(201).json({
      message: `Have a Great Day ${messageName[0]}!`,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.json({ message: "User Not Found." });
  }
  const isMatch = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!isMatch) {
    return res.json({ message: "Worng password Try Again." });
  }
  const token = jwt.sign(
    {
      userId: existingUser._id
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  const messageName = existingUser.username.split(" ");
  res.json({
    message: `Welcome Back ${messageName[0]}!`
  });
});

app.post("/logout", async (req, res) => {
  console.log("enter here");
   res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.json({
    message: "Logged out successfully"
  });
})

app.get("/user", async (req, res) => {
  const { e } = req.query;
  const userData = await User.findOne({ email: e });
  res.json({
    userData
  });
})

// app.post("/user/addfav", async (req, res) => {
//   const { foodId } = req.body;
//   console.log(foodId);
//   const updatedUser = await User.findByIdAndUpdate(
//     userId,
//     { $addToSet: { favourite: foodId } },
//     { new: true } // Returns the updated document instead of the old one
//   );
//   res.json({ message: "Successful" });
// })
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});