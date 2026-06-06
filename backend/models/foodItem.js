const mongoose = require("mongoose");
const foodItem = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    unit: String,
    description: String,
    image: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }
});

const FoodItems = mongoose.model("foodItem", foodItem);
module.exports = FoodItems;