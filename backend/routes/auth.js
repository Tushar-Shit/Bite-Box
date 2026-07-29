import express from "express";
import { signup, resendOTP, verifySignup, login, logout } from "../controllers/authController.js";
const router = express.Router({ mergeParams: true });

router.post("/signup", signup);

router.post("/signup/resend-otp", resendOTP)

router.post("/signup/verify-otp",verifySignup)

router.post("/login", login);

router.post("/logout", logout);

export default router;