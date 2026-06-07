const mongoose = require("mongoose");
const reviews = new mongoose.Schema({
    food_belong: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItems",
    },
    author: String,
    rating: Number,
    like: Number,
    unlike: Number,
    comment: String,

});

const Reviews = mongoose.model("review", reviews);
module.exports = Reviews;