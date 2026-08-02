import express from "express";
import React from "react";
import { render } from "@react-email/render";
import Users from "../models/user";
import authentication from "../middleware/authentication";
import ChangeEmailOTP from "../emails/changeEmailOTP";
import sendEmail from "../utils/sendEmail";
import PendingSignup from "../models/pendingSignup";
const router = express.Router({ mergeParams: true });


router.post("/email-change", authentication, async (req, res) => {
    try {
        const userId = req.user;
        const { newemail, username, useremail } = req.body;

        const userExist = await Users.findOne({ email: newemail })
        if (userExist) {
            return res.status(400).json({
                code: "failed",
                message: "This email is already registered."
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        await PendingSignup.deleteOne({ email: useremail });

        // Save pending signup
        await PendingSignup.create({
            username: username,
            email: useremail,
            password: newemail,
            OTP: otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        //converting the JSX template into html
        const html = await render(
            React.createElement(ChangeEmailOTP, {
                username,
                otp,
            })
        );

        //send the actual otp to user
        await sendEmail(
            newemail,
            `${otp} - use this code to change your Email in Bitebox`,
            html
        );
        // console.log("hello");
        return res.status(200).json({
            code: "success",
            message: `OTP sent successfully to ${newemail}`,
            email: newemail,
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            code: "failed",
            message: "Internal server error"
        });
    }

})

router.post("/verify-code", authentication, async (req, res) => {
    try {
        const { OTP } = req.body;
        const userId = req.user;
        const email = req.email;

        const data = await PendingSignup.findOne({
            email: email,
            OTP: OTP
        });
        if (!data) {
            return res.status(400).json({
                code: "failed",
                message: "Invalid OTP or maybe expired, please try again."
            });
        }
        const userData = await Users.findByIdAndUpdate(
            userId,
            { email: data.password },
            { new: true }
        );
        return res.status(200).json({
            code: "success",
            message: "Email change successful",
        })
    } catch (err) {
        console.log(err);

    }
})


export default router;