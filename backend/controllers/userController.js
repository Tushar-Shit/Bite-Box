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

}

//user email change verify code and actual email change
export const verifyCode = async (req, res) => {
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
}

//userpassword change
export const passwordChange = async (req, res) => {
    const { currentPass, newPass } = req.body;
    console.log(currentPass, newPass);
    console.log(req.user);
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
    await userData.save();
    return res.status(200).json({
        code: "success",
        message: "Password changed successfully!"
    });
}





//provide cart data
export const getCart = async (req, res) => {
    const currentUserId = req.user;
    const data = await Cart.findOne({ userId: currentUserId }).populate("items.foodId");
    if (!data || data.items.length <= 0) {
        return res.status(404).json({
            quick: "No Data Found!",
            message: "Your cart is empty...",
            code: "ND"
        });
    }
    res.json(data.items);
};


//handle full cart updations
export const updateCart = async (req, res) => {
    try {
        const { data, command } = req.body;
        if (!data.length) {
            return res.status(400).json({
                message: "Cart is empty."
            });
        }

        //create array of IDs to find foods
        const foodIds = data.map(item => item.id);
        //extract the foods
        const foods = await FoodItem.find({
            _id: { $in: foodIds }
        });
        if (foods.length !== foodIds.length) {
            return res.status(404).json({
                message: "One or more food items not found."
            });
        }
        //make pair of id and food document
        const foodMap = new Map(
            foods.map(food => [food._id.toString(), food])
        );
        //make pair of id and quantity { ex52bydh3736nd.., 3}
        const quantityMap = new Map(
            data.map(item => [item.id.toString(), item.quantity])
        );
        const availableMap = new Map(
            data.map(item => [item.id.toString(), item.available])
        );

        const cartItems = foods.map(food => ({
            foodId: food._id,
            quantity: quantityMap.get(food._id.toString()),
            price: quantityMap.get(food._id.toString()) * food.price,
            available: availableMap.get(food._id.toString()),
        }));
        console.log(cartItems);

        const existingCart = await Cart.findOne({ userId: req.user });
        if (existingCart) {
            for (let cartItem of cartItems) {
                const existItem = existingCart.items.find(
                    item => item.foodId.toString() === cartItem.foodId.toString()
                );

                if (existItem) {
                    const price = foodMap.get(cartItem.foodId.toString()).price;
                    if (command === "increase") {
                        existItem.quantity += 1;
                        existItem.price = price * existItem.quantity;
                        await existingCart.save();
                        return res.json({ message: "Number Increased" });
                    }
                    else if (command === "decrease") {
                        if (existItem.quantity <= 1) {
                            existItem.price = price * existItem.quantity;
                            return res.json({ message: "Number Decreased" });;
                        }
                        existItem.quantity -= 1;
                        existItem.price -= price;
                        await existingCart.save();
                        return res.json({ message: "Number Decreased" });
                    }
                    else if (command === "SCA") {
                        existItem.quantity = cartItem.quantity;
                        existItem.price = cartItem.price;
                    }
                    else if (command === "add/dlt") {
                        existingCart.items.pull({ foodId: cartItem.foodId })
                        await existingCart.save();
                        return res.json({ message: "Removed from Cart" });
                    }
                    else {
                        return res.status(400).json({
                            message: "Invalid command."
                        });
                    }
                }
                else {
                    console.log("this item is not in db");
                    existingCart.items.push(cartItem);
                }
            }
            await existingCart.save();
            return res.json({ message: "Added to Cart" });
        }
        else {
            //run if cart not exist, for very new users
            await Cart.create({
                userId: req.user,
                items: cartItems
            });
            return res.json({ message: "Your cart is created" });
        }
    } catch (e) {
        console.error(e);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}