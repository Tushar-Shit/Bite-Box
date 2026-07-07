const express = require('express');
const router = express.Router({ mergeParams: true });
const Category = require("../models/categories");
const FoodItem = require("../models/foodItem");
const Reviews = require("../models/reviews");
const Users = require("../models/user");
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
module.exports = router;