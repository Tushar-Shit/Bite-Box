import React from "react";
import FoodItem from "../models/foodItem.js";
import Users from "../models/user.js";
import Cart from "../models/cart.js";
import PendingSignup from "../models/pendingSignup";
import ChangeEmailOTP from "../emails/changeEmailOTP";
import { render } from "@react-email/render";
import sendEmail from "../utils/sendEmail";
import bcrypt from "bcrypt";

//return total user data
export const profile = async (req, res) => {
    const user = await Users.findById(
        req.user
    );
    res.json(user);
};

//user data update 
export const updateProfile = async (req, res) => {
    const { username, email, mobile, address1, address2, } = req.body;
    const user = await Users.findByIdAndUpdate(
        req.user,
        {
            username,
            mobile,
            address1,
            address2,
        },
        {
            returnDocument: 'after',
            runValidators: true,
        }
    );

    res.status(200).json({ message: "successfull" })
}

//user email change otp send/resend
export const emailChange = async (req, res) => {
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
}

//user email change verify code and actual email change
export const verifyCode = async (req, res) => {
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
}

//userpassword change
export const passwordChange = async (req, res) => {
    const { currentPass, newPass } = req.body;
    const userData = await Users.findById(req.user);
    if (!userData) {
        return res.status(404).json({
            code: "failed",
            message: "User Not Found!"
        });
    }

    const isMatch = await bcrypt.compare(
        currentPass,
        userData.password
    );
    if (!isMatch) {
        return res.status(400).json({
            code: "failed",
            message: "Your current password is wrong."
        });
    }
    const hashedPassword = await bcrypt.hash(newPass, 10);
    userData.password = hashedPassword;
    userData.tokenVersion++;
    await userData.save();
    return res.status(200).json({
        code: "success",
        message: "Password changed successfully!"
    });
}
