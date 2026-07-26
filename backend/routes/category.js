import express from "express"
import Category from "../models/categories.js"
import FoodItem from "../models/foodItem.js"
import Reviews from "../models/reviews.js"
const router = express.Router({ mergeParams: true });

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

export default router;