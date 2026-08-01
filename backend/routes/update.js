import express from "express";
import React from "react";
import { render } from "@react-email/render";
import Users from "../models/user";
import authentication from "../middleware/authentication";
import ChangeEmailOTP from "../emails/changeEmailOTP";
import sendEmail from "../utils/sendEmail";
import PendingSignup from "../models/pendingSignup";
const router = express.Router({ mergeParams: true });


//add authentication later
router.post("/email-change", authentication, async (req, res) => {
    try {
        const userId = req.user;
        const { email } = req.body;


        const userExist = await Users.findOne({ email })
        if (userExist) {
            return res.status(400).json({
                code: "failed",
                message: "This email is already registered."
            })
        }

        const user = await Users.findById(userId)
        if (!user) {
            return res.status(400).json({
                code: "failed",
                message: "User Not Found"
            })
        }
        const senderName = user.username;
        const senderEmail = user.email;
        const otp = Math.floor(100000 + Math.random() * 900000);

        await PendingSignup.deleteOne({ email: senderEmail });

        // Save pending signup
        await PendingSignup.create({
            username: senderName,
            email: senderEmail,
            password: email,
            OTP: otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        //converting the JSX template into html
        const html = await render(
            React.createElement(ChangeEmailOTP, {
                senderName,
                otp,
            })
        );

        //send the actual otp to user
        await sendEmail(
            senderEmail,
            `${otp} - use this code to change your Email in Bitebox`,
            html
        );
        // console.log("hello");
        return res.status(200).json({
            code: "success",
            message: `OTP sent successfully to ${senderEmail}`,
            email: senderEmail,
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            code: "failed",
            message: "Something went worng"
        });
    }

})

router.post("/verify-code", authentication, async (req, res) => {
    const { OTP } = req.body;
    const userId = req.user;
    const email = req.email;
    console.log(email, userId)
    // console.log(typeof (OTP));

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
    // console.log(data);


})


export default router;