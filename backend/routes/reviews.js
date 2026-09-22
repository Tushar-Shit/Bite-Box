import express from "express"
import Category from "../models/categories.js"
import FoodItem from "../models/foodItem.js"
import Reviews from "../models/reviews.js"
import authentication from "../middleware/authentication.js"
import Users from "../models/user.js"
const router = express.Router({ mergeParams: true });


// Add rating and review to all the items in that order
router.post("/add-review", authentication, async (req, res) => {
  try {
    const { rating, review, order } = req.body;

    const customer = await Users.findOne({
      _id: req.user
    });

    if (!customer) {
      return res.json({ message: "failed" });
    }

    const reviewPromises = order.items.map(async (item) => {

      // Create review
      const newReview = await Reviews.create({
        food_belong: item.foodId,
        author: customer.username,
        authorId: customer._id.toString(),
        rating: rating,
        comment: review
      });

      // Add review ID to FoodItem
      await FoodItem.findByIdAndUpdate(
        item.foodId,
        {
          $push: {
            rating: newReview._id
          }
        }
      );

      return newReview;
    });

    await Promise.all(reviewPromises);

    return res.json({
      message: "success"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "error",
      error: error.message
    });
  }
});



// router.post("/testing", authentication, async (req, res) => {
//     const { foodId, name, text, rating } = req.body
//     const response = await Reviews.create({
//         food_belong: foodId,
//         author: name,
//         authorId: req.user,
//         comment: text,
//         rating: rating
//     });
// })
// router.patch("/like/:id", async (req, res) => {
//     const { id } = req.params;
//     const { totalLike } = req.body;
//     try {
//         await Reviews.findByIdAndUpdate(id, { $set: { like: totalLike } })
//     }
//     catch (err) {
//         console.log(err);
//     }
// })
// router.patch("/unlike/:id", async (req, res) => {
//     const { id } = req.params;
//     const { totalLike } = req.body;
//     try {
//         await Reviews.findByIdAndUpdate(id, { $set: { unlike: totalLike } })
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

export default router;