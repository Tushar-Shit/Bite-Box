const express = require('express');
const router = express.Router({ mergeParams: true });
const Category = require("../models/categories");
const FoodItem = require("../models/foodItem");
const Reviews = require("../models/reviews");
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isProduction = process.env.PROJECT_MODE === "production";

// console.log(process.env.PROJECT_MODE);

router.post("/signup", async (req, res) => {
  // console.log("tygfhbcvfggtredsxzaw");
  try {
    const { username, email, password } = req.body;
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      username,
      email,
      password: hashedPassword,
    });
    //extracting the newly registered user and make them login
    const newUser = await Users.findOne({ email });
    const token = jwt.sign(
      {
        userId: newUser._id
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await Users.findOne({ email });

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
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  const messageName = existingUser.username.split(" ");
  res.json({
    message: `Welcome Back ${messageName[0]}!`
  });
});

router.post("/logout", async (req, res) => {
  console.log("enter here");
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.json({
    message: "Logged out successfully"
  });
})

module.exports = router;