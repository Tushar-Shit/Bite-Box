import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/user.js";
import PendingSignup from "../models/pendingSignup.js";
import { sendSignupOTP } from "../utils/sendEmail.js";
const isProduction = process.env.PROJECT_MODE === "production";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //check is email exist
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "This email is already registered.",
        code: "failed",
      });
      return;
    }

    // generate OTP and password hashed
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedPassword = await bcrypt.hash(password, 10);

    //if already in PendingSignup collection delete for smooth signup process
    await PendingSignup.deleteOne({ email });


    //  store informations into DB
    // Store pending signup
    await PendingSignup.create({
      username,
      email,
      password: hashedPassword,
      OTP: otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    try {
      const firstName = username.split(" ");

      const info = await sendSignupOTP(
        email,
        firstName[0],
        otp
      );

      console.log("Mail info:", info);

      if (!info.accepted?.length) {
        await PendingSignup.deleteOne({ email });

        return res.status(500).json({
          message: "Failed to send OTP email.",
          code: "failed",
        });
      }
    } catch (error) {
      console.error("Signup mail error:", error);

      await PendingSignup.deleteOne({ email });

      return res.status(500).json({
        message: "Failed to send OTP email.",
        code: "failed",
      });
    }

    return res.status(200).json({
      message: `OTP sent to ${email}`,
      code: "successful",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const resendOTP = async (req, res) => {
  //  take informations from user while resend OTP
  const { username, email, password } = req.body;

  //  generate OTP
  const newOTP = Math.floor(100000 + Math.random() * 900000);

  //  if user exist in temporary DB update it
  const result = await PendingSignup.updateOne(
    { email },
    {
      OTP: newOTP,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    }
  );
  // if user details not in db create new one and send OTP
  if (result.matchedCount === 0) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await PendingSignup.create({
      username: username,
      email: email,
      password: hashedPassword,
      OTP: newOTP,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    })

    const info = await sendSignupOTP(
      email,
      username,
      newOTP
    );

    return res.json({
      message: "not in db but OTP resend successful",
      code: "successful"
    })
  }

  //  send OTP to the user
  const info = await sendSignupOTP(
    email,
    username,
    newOTP
  );

  if (info.accepted.length === 0) {
    await PendingSignup.deleteOne({ email })
    res.status(500).json({
      message: "Failed to send OTP email.",
      code: "failed",
    });
  }

  return res.status(200).json({
    message: `OTP send to ${email}`,
    code: "successful",
  });

}


export const verifySignup = async (req, res) => {
  const { email, userOTP } = req.body;

  //check is there any data exist against this email
  const tempData = await PendingSignup.findOne({ email });

  // extract stored OTP
  const DBOTP = Number(tempData.OTP)

  //if OTP doesn't matched return
  if (!(userOTP === DBOTP)) {
    return res.status(404).json({
      message: "*This OTP is invalid.",
      code: "failed",
    })
  }

  //create the new user
  const user = await Users.create({
    username: tempData.username,
    email: email,
    password: tempData.password,
  });

  //delete temporary data from PendingSignup collection
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
    code: "created"
  });

}






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