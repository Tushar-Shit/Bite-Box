import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/user.js";
import PendingSignup from "../models/pendingSignup.js";

const isProduction = process.env.PROJECT_MODE === "production";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // OTP and password hashed
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Send OTP here
    // Store PendingSignup here

    const user = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    const newUser = await Users.findOne({ email });

    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
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
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await Users.findOne({ email });

  if (!existingUser) {
    return res.json({
      message: "User Not Found.",
    });
  }

  const isMatch = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isMatch) {
    return res.json({
      message: "Worng password Try Again.",
    });
  }

  const token = jwt.sign(
    {
      userId: existingUser._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const messageName = existingUser.username.split(" ");

  res.json({
    message: `Welcome Back ${messageName[0]}!`,
  });
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

  res.json({
    message: "Logged out successfully",
  });
};