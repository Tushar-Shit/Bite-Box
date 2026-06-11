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

//request for details of a specific food item  from food
router.get("/:item/:id", async (req, res) => {
    const { item, id } = req.params;
    const foodItem = await FoodItem.findById(id);
    const reviews = await Reviews.find({ food_belong: id });
    res.json({ foodItem, reviews });

});



//request for all items in a category
router.get("/:item", async (req, res) => {
    const { item } = req.params;
    const category = await Category.findOne({ name: item });
    const fooditems = await FoodItem.find({ category: category._id });
    res.json({ fooditems });
});








module.exports = router;