import express from "express";
import {
    signup,
    resendOTP,
    verifySignup,
    login,
    logout,
    forgetPassword,
    resetPassword,
} from "../controllers/authController.js";
const router = express.Router({ mergeParams: true });

//first stage of signup, generate and send otp
router.post("/signup", signup);


//resend otp from signup
router.post("/signup/resend-otp", resendOTP)


//verify OTP and create user
router.post("/signup/verify-otp", verifySignup)

//login and logout routes
router.post("/login", login);
router.delete("/logout", logout);

//generate token and send reset password link
router.post("/forget-password", forgetPassword);

//match token and change password
router.patch("/reset-password", resetPassword);



export default router;