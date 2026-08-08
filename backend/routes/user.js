import express from "express";
import authentication from "../middleware/authentication.js";
import {
    profile,
    updateProfile,
    emailChange,
    verifyCode,
    passwordChange,
} from "../controllers/userController.js";
const router = express.Router({ mergeParams: true });

router.get("/profile", authentication, profile);    //provide user data
router.patch("/profile", authentication, updateProfile);    //update user data


router.post("/email-change", authentication, emailChange);  //send OTP to user
router.patch("/email-change", authentication, verifyCode);  //verify and actual change


router.patch("/password-change", authentication, passwordChange);  //password change
export default router;