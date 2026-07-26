import express from "express"
import Category from "../models/categories.js"
import FoodItem from "../models/foodItem.js"
import Reviews from "../models/reviews.js"
const router = express.Router({ mergeParams: true });

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

export default router;