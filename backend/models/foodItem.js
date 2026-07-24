const mongoose = require("mongoose");
const foodItem = new mongoose.Schema({
    name: String,
    price: Number,
    servingQuantity:Number,
    quantity: Number,
    unit: String,
    description: String,
    image: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    tag:String,
});

const FoodItems = mongoose.model("foodItem", foodItem);
module.exports = FoodItems;