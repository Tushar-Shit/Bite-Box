import express from "express"
import Category from "../models/categories.js"
import FoodItem from "../models/foodItem.js"
import Reviews from "../models/reviews.js"
import authentication from "../middleware/authentication.js"
const router = express.Router({ mergeParams: true });



router.post("/testing", authentication, async (req, res) => {
    const { foodId, name, text, rating } = req.body;
    // console.log(foodId, name, text, rating);
    // console.log(req.user);
    const response = await Reviews.create({
        food_belong: foodId,
        author: name,
        authorId: req.user,
        comment: text,
        rating: rating
    });


})


// router.get("/testing",  async (req, res) => {
//    console.log("hello tushar")

// })








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