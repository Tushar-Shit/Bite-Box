import mongoose from "mongoose";

const reviews = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: true,
    },

    food_belong: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodItem",
        required: true,
    },

    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    author: String,
    rating: Number,
    comment: String,
});

const Reviews = mongoose.model("review", reviews);
export default Reviews;