import express from "express";
import authentication from "../middleware/authentication.js";
import {
    profile,
    updateProfile,
    emailChange,
    verifyCode,
    passwordChange,
} from "../controllers/userController.js";
import asyncHandler from "../middleware/asyncHandler.js";
const router = express.Router({ mergeParams: true });

router.get("/profile", authentication, asyncHandler(profile));    //provide user data
router.patch("/profile", authentication, asyncHandler(updateProfile));    //update user data


router.post("/email-change", authentication, asyncHandler(emailChange));  //send OTP to user
router.patch("/email-change", authentication, asyncHandler(verifyCode));  //verify and actual change


router.patch("/password-change", authentication, asyncHandler(passwordChange));  //password change
export default router;