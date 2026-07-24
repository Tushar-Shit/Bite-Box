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
router.post("/cart", authentication, async (req, res) => {
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

        const cartItems = foods.map(food => ({
            foodId: food._id,
            quantity: quantityMap.get(food._id.toString()),
            price: quantityMap.get(food._id.toString()) * food.price
        }));

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
})

module.exports = router;