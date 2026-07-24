const express = require('express');
const router = express.Router({ mergeParams: true });
const Category = require("../models/categories");
const FoodItem = require("../models/foodItem");
const Reviews = require("../models/reviews");




router.patch("/like/:id", async (req, res) => {
    const { id } = req.params;
    const { totalLike } = req.body;
    try {
        await Reviews.findByIdAndUpdate(id, { $set: { like: totalLike } })
    }
    catch (err) {
        console.log(err);
    }
})
router.patch("/unlike/:id", async (req, res) => {
    const { id } = req.params;
    const { totalLike } = req.body;
    try {
        await Reviews.findByIdAndUpdate(id, { $set: { unlike: totalLike } })
    }
    catch (err) {
        console.log(err);
    }
})







module.exports = router;