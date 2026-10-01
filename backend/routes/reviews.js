import mongoose from "mongoose";
import express from "express";
import authentication from "../middleware/authentication.js";
import Reviews from "../models/reviews.js";
import Users from "../models/user.js";
import FoodItem from "../models/foodItem.js";

const router = express.Router();

router.post("/add-review", authentication, async (req, res) => {
  try {
    const { selectedItems, rating, review, orderId } = req.body;
console.log(selectedItems);
    // Validate selected items
    if (!Array.isArray(selectedItems) || selectedItems.length === 0) {
      return res.status(400).json({
        message: "No food items selected",
      });
    }

    // Validate orderId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    // Find customer
    const customer = await Users.findById(req.user);

    if (!customer) {
      return res.status(401).json({
        message: "Customer not found",
      });
    }

    // Create reviews for all selected items
    const reviewPromises = selectedItems.map(async (item) => {
      console.log("Received item:", item);
      console.log("Item type:", typeof item);

      // Validate food ID
      if (!mongoose.Types.ObjectId.isValid(item)) {
        throw new Error(`Invalid food item ID: ${item}`);
      }

      // Convert string -> ObjectId
      const foodId = new mongoose.Types.ObjectId(item);

      console.log("Converted foodId:", foodId);

      // Create review
      const newReview = await Reviews.create({
        orderId: new mongoose.Types.ObjectId(orderId),
        food_belong: foodId,
        authorId: customer._id,
        author: customer.username,
        rating: rating,
        comment: review,
      });

      console.log("Created review:", newReview);

      // Add review ID to FoodItem
      await FoodItem.findByIdAndUpdate(
        foodId,
        {
          $push: {
            rating: newReview._id,
          },
        },
        {
          returnDocument: "after",
        }
      );

      return newReview;
    });

    await Promise.all(reviewPromises);

    return res.status(201).json({
      message: "success",
    });
  } catch (error) {
    console.error("ADD REVIEW ERROR:", error);

    return res.status(500).json({
      message: "Failed to add review",
      error: error.message,
    });
  }
});

export default router;