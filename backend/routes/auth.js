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
import asyncHandler from "../middleware/asyncHandler.js";
const router = express.Router({ mergeParams: true });

//first stage of signup, generate and send otp
router.post("/signup", asyncHandler(signup));


//resend otp from signup
router.post("/signup/resend-otp", asyncHandler(resendOTP))


//verify OTP and create user
router.post("/signup/verify-otp", asyncHandler(verifySignup))

//login and logout routes
router.post("/login", asyncHandler(login));
router.delete("/logout", asyncHandler(logout));

//generate token and send reset password link
router.post("/forget-password", asyncHandler(forgetPassword));

//match token and change password
router.patch("/reset-password", asyncHandler(resetPassword));



export default router;