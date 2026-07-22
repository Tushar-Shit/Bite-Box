const express = require('express');
const router = express.Router({ mergeParams: true });
const Category = require("../models/categories");
const FoodItem = require("../models/foodItem");
const Reviews = require("../models/reviews");
const Users = require("../models/user");
const Cart = require("../models/cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authentication = require("../middleware/authentication");


router.get("/profile", authentication, async (req, res) => {
    const user = await Users.findById(
        req.user
    );

    res.json({
        username: user.username,
        email: user.email,
    });

});

router.post("/addfav", authentication, async (req, res) => {
    const { foodId } = req.body;
    const userId = req.user;
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

router.get("/favourite", authentication, async (req, res) => {
    const user = await Users.findById(req.user).populate("favourites");
    res.json({ favourites: user.favourites })
});

//provide cart data

router.get("/cart", authentication, async (req, res) => {
    const currentUserId = req.user;
    const data = await Cart.findOne({ userId: currentUserId }).populate("items.foodId");
    if (data.items.length <= 0) {
        return res.status(404).json({
            quick: "No Data Found!",
            message: "Your cart is empty...",
            code: "ND"
        });
    }
    res.json(data.items);
});


//handle full cart updations
router.post("/cart",authentication, async (req, res) => {
    const MAX_ITEMS = 15;
    const { FId, FQuantity, FPrice, command } = req.body;

    //return if foodId not comes
    if (!FId) return res.status(404).json({
        message: "Incorrect Data",
    });

    const existingCart = await Cart.findOne({ userId: req.user });
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