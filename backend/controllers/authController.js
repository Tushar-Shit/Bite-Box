import React from "react";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { render } from "@react-email/render";
import Users from "../models/user.js";
import PendingSignup from "../models/pendingSignup.js";
import SignupOTP from "../emails/singupOTP.jsx"; //email template
import ForgetPassword from "../emails/ForgetPassword.jsx"; //email template
import sendEmail, { sendResetEmail } from "../utils/sendEmail.js";
import { log } from "console";
const isProduction = process.env.PROJECT_MODE === "production";


//first stage of signup, taking data generate OTP
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Check existing user
  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "This email is already registered.",
      code: "failed",
    });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Remove previous pending signup
  await PendingSignup.deleteOne({ email });

  // Save pending signup
  await PendingSignup.create({
    username,
    email,
    password: hashedPassword,
    OTP: otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  //converting the JSX template into html
  const html = await render(
    React.createElement(SignupOTP, {
      firstName: username.split(" ")[0],
      otp,
    })
  );

  //send the actual otp to user
  await sendEmail(
    email,
    `${otp} - is your signup code for Bitebox`,
    html
  );

  return res.status(200).json({
    message: `OTP sent successfully to ${email}`,
    code: "successful",
  });
};


//resend OTP from varify OTP page while signup
export const resendOTP = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      code: "failed",
      message: "All fields are required.",
    });
  }

  // Generate new OTP
  const newOTP = Math.floor(100000 + Math.random() * 900000);

  // Check whether a pending signup already exists
  let pendingUser = await PendingSignup.findOne({ email });

  // Used to know whether we created a new document
  let createdNew = false;

  // Update existing pending signup
  if (pendingUser) {
    pendingUser.OTP = newOTP;
    pendingUser.expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await pendingUser.save();
  } else {
    // Create new pending signup
    const hashedPassword = await bcrypt.hash(password, 10);

    pendingUser = await PendingSignup.create({
      username,
      email,
      password: hashedPassword,
      OTP: newOTP,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    createdNew = true;
  }


  const html = await render(
    React.createElement(SignupOTP, {
      firstName: username.split(" ")[0],
      otp: newOTP,
    })
  );

  await sendEmail(
    email,
    "BiteBox Email Verification",
    html
  );

  return res.status(200).json({
    code: "successful",
    message: `OTP sent successfully to ${email}`,
  });
};


//OTP verifying and user created
export const verifySignup = async (req, res) => {

  const { email, userOTP } = req.body;

  const tempData = await PendingSignup.findOne({ email });
  const DBOTP = Number(tempData.OTP);

  //if OTP doesn't matched return
  if (userOTP !== DBOTP.toString()) {
    return res.status(404).json({
      code: "failed",
      message: "Invalid OTP try again.",
    })
  }

  //create the new user
  const user = await Users.create({
    username: tempData.username,
    email: email,
    password: tempData.password,
  });
  if (!user) {
    return res.status(500).json({
      message: "Server Error, please try again letter",
      code: "failed",
    })
  }
  await PendingSignup.deleteOne({ email });

  //creating a new token for the new user
  const newUser = await Users.findOne({ email });
  const token = jwt.sign(
    {
      userId: newUser._id,
      tokenVersion: newUser.tokenVersion,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  //set the cookie for 7days
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,    //7 days
  });

  //greet the user
  const messageName = newUser.username.split(" ");
  res.status(201).json({
    message: `Have a Great Day ${messageName[0]}!`,
    code: "success",
    user: {
      userid: newUser._id,
      username: newUser.username,
      useremail: newUser.email,
      userrole: "user"
    }

  });
}


//login code block
export const login = async (req, res) => {

  const { email, password } = req.body;
  const existingUser = await Users.findOne({ email });

  if (!existingUser) {
    return res.json({
      code: "failed",
      message: "User Not Found.",
    });
  }

  const isMatch = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isMatch) {
    return res.json({
      code: "failed",
      message: "Worng password Try Again.",
    });
  }

  const token = jwt.sign(
    {
      userId: existingUser._id,
      tokenVersion: existingUser.tokenVersion,
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
    code: "success",
    message: `Welcome Back ${messageName[0]}!`,
    user: { userid: existingUser._id, username: existingUser.username, useremail: existingUser.email, userrole: "user" }
  });
};


//logout code block
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


//forget password, reset link generation
export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const userData = await Users.findOne({ email });
  if (!userData) {
    return res.status(404).json({
      code: "failed",
      message: "No user is register with this email."
    })
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  userData.resetPasswordToken = resetToken;
  userData.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
  await userData.save();
  const html = await render(
    React.createElement(ForgetPassword, {
      resetLink: `https://bite-box-ten.vercel.app/reset-password/${resetToken}`
    })
  );
  await sendResetEmail(
    email,
    `Reset Your Password`,
    html
  );
  return res.status(200).json({
    code: "success",
    message: `Password reset link send to ${email}`
  });
}


//reset password after taking the new password from user
export const resetPassword = async (req, res) => {
  const { token, newPass } = req.body;
  const data = await Users.findOne({ resetPasswordToken: token })
  if (!data) {
    return res.status(404).json({
      code: "failed",
      message: "Session ended try again."
    });
  }
  const hashedPassword = await bcrypt.hash(newPass, 10)

  data.password = hashedPassword;
  data.tokenVersion++;
  data.resetPasswordExpires = null;
  data.resetPasswordToken = null;
  await data.save();

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

  return res.status(200).json({
    code: "success",
    message: "Password changed."
  });
}
