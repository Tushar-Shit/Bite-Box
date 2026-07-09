const express = require('express');
const router = express.Router({ mergeParams: true });
const Category = require("../models/categories");
const FoodItem = require("../models/foodItem");
const Reviews = require("../models/reviews");
const Users = require("../models/user");
const Cart = require("../models/cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// router.get("/", async (req, res) => {
//     const { e } = req.query;
//     const userData = await Users.findOne({ email: e });
//     res.json({
//         userData
//     });
// })

router.get("/profile", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Not logged in",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await Users.findById(
            decoded.userId
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json({
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        res.status(401).json({
            message: "Invalid token",
        });
    }
});

router.post("/addfav", async (req, res) => {
    // console.log("into addfav block");
    //extract food item id
    const { foodId } = req.body;
    //extract the token stored in cookie
    const token = req.cookies.token;
    //return if foodId or Token not comes
    if (!foodId || !token) return res.status(404).json({
        message: "Incorrect Data",
    });;
    //decode token to get the user id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    //find the user in DB
    const user = await Users.findById(userId);
    if (!user) return res.status(404).json({
        message: "User not found",
    });;
    const exists = await Users.exists({
        _id: userId,
        favourites: foodId,
    });

    if (exists) {
        await Users.findByIdAndUpdate(userId, {
            $pull: { favourites: foodId },
        });
        res.json({ message: "Remove From Favourite", });
    } else {
        await Users.findByIdAndUpdate(userId, {
            $addToSet: { favourites: foodId },
        });
        res.json({ message: "Add to Favourite" });
    }
});

router.get("/favourite", async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await Users.findById(userId).populate("favourites");
    res.json({ favourites: user.favourites })
});

//provide cart data

router.get("/cart", async (req, res) => {
    const token = req.cookies.token;
    //return if foodId or Token not comes
    if (!token) return res.status(404).json({
        message: "Incorrect Data",
    });;
    //decode token to get the user id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUserId = decoded.userId;
    const data = await Cart.findOne({ userId: currentUserId }).populate("items.foodId");
    // console.log(data.items);
    res.json(data.items);
});


//handle full cart updations
router.post("/cart", async (req, res) => {
    const MAX_ITEMS = 15;
    const { FId, FQuantity, FPrice, command } = req.body;
    const token = req.cookies.token;
    // console.log(FId,FQuantity, FPrice, command, token);

    //return if foodId or Token not comes
    if (!FId || !token) return res.status(404).json({
        message: "Incorrect Data",
    });;
    //decode token to get the user id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUserId = decoded.userId;


    const existingCart = await Cart.findOne({ userId: currentUserId });
    // console.log(existingCart)
    if (existingCart) {
        //extract the exact food item among all cart items
        const item = existingCart.items.find(
            item => item.foodId.toString() === FId.toString()
        );

        if (item) {
            if (command.trim() === "increase") {
                item.quantity += 1;
                item.price = FPrice * item.quantity;
                await existingCart.save();
                return res.json({ message: "Number Increased" });
            }
            else if (command.trim() === "decrease") {
                if (item.quantity <= 1) {
                    item.quantity = 1;
                    item.price = FPrice * item.quantity;
                }
                item.quantity -= 1;
                item.price = FPrice;
                await existingCart.save();
                return res.json({ message: "Number Decreased" });
            }
            else {
                existingCart.items.pull({ foodId: FId })
                await existingCart.save();
                return res.json({ message: "Removed from Cart" });
            }
        } else {
            if (existingCart.items.length >= MAX_ITEMS) {
                return res.status(400).json({
                    message: "Cart is full",
                   
                });
            }
            existingCart.items.push({
                foodId: FId,
                quantity: 1,
                price: FPrice
            });
        }
        await existingCart.save();
        return res.json({ message: "Added to Cart" });
    }

    //if user has not any cart yet
    const cartItem = await Cart.create({
        userId: currentUserId,
        items: [
            {
                foodId: FId,
                quantity: 1,
                price: FPrice
            }
        ]
    });
    res.json({ message: "Added to Cart" });
})

module.exports = router;