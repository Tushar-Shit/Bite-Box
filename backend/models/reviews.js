import mongoose from "mongoose";
const reviews = new mongoose.Schema({
    food_belong: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItems",
    },
    author: String,
    authorId:String,
    rating: Number,
    comment: String,
});

const Reviews = mongoose.model("review", reviews);
export default Reviews;