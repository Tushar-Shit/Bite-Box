import mongoose from "mongoose";
const foodItem = new mongoose.Schema({
    name: String,
    price: Number,
    servingQuantity: Number,
    quantity: Number,
    unit: String,
    description: String,
    image: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    available: Boolean,
    tag: String,
    rating: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
    }],
});

const FoodItems = mongoose.model("foodItem", foodItem);
export default FoodItems;