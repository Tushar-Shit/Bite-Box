const express = require('express');
const router = express.Router({ mergeParams: true });
const Category = require("../models/categories");
const FoodItem = require("../models/foodItem");
const Reviews = require("../models/reviews");

//request for category list
router.get("/", async (req, res) => {
    const categoriesData = await Category.find({});
    res.json(categoriesData);
})

//request for all items in a category
router.get("/:item", async (req, res) => {
    const { item } = req.params;
    const category = await Category.findOne({ name: item });
    const fooditems = await FoodItem.find({ category: category._id });
    res.json({ fooditems });
});

module.exports = router;