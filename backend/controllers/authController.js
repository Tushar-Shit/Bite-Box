import React from "react";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { render } from "@react-email/render";
import Users from "../models/user.js";
import PendingSignup from "../models/pendingSignup.js";
import SignupOTP from "../emails/singupOTP.jsx"; //email template
import sendEmail from "../utils/sendEmail.js";
const isProduction = process.env.PROJECT_MODE === "production";


//first stage of signup, taking data generate OTP
export const signup = async (req, res) => {
  try {
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

  } catch (err) {
    await PendingSignup.deleteOne({ email });
    console.log(err);

    return res.status(500).json({
      message: "Failed to send OTP.",
      code: "failed",
    });
  }
};


//resend OTP from varify OTP page while signup
export const resendOTP = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        code: "missing",
        message: "All fields are required.",
      });
    }

    // Generate new OTP
    const newOTP = Math.floor(100000 + Math.random() * 900000);

    // Check whether a pending signup already exists
    let pendingUser = await PendingSignup.findOne({ email });

    // Used to know whether we created a new document
    let createdNew = false;

    if (pendingUser) {
      // Update existing pending signup
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

    try {
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

    } catch (mailError) {
      console.error(mailError);

      // Remove only newly created pending signup
      if (createdNew) {
        await PendingSignup.deleteOne({ _id: pendingUser._id });
      }

      return res.status(500).json({
        code: "failed",
        message: "Failed to send OTP.",
      });
    }

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      code: "error",
      message: "Internal server error.",
    });
  }
};


//OTP verifying and user created
export const verifySignup = async (req, res) => {
  try {
    const { email, userOTP } = req.body;

    const tempData = await PendingSignup.findOne({ email });
    const DBOTP = Number(tempData.OTP);

    //if OTP doesn't matched return
    if (userOTP !== DBOTP.toString()) {
      return res.status(404).json({
        message: "Invalid OTP try again.",
        code: "failed",
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
  } catch (err) {
    console.log(err)
  }

}


//login code block
export const login = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err)
  }
};


//logout code block
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    res.json({
      message: "Logged out successfully",
    });
  } catch (err) {
    console.log(err);

  }
};