const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItem = new Schema({
    foodId: {
        type: Schema.Types.ObjectId,
        ref: "foodItem",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
    }
}, {
    _id: false,
});

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        // required: true,
        unique: true,
    },
    items: [cartItem],
});

const cart = mongoose.model("cart", cartSchema);
module.exports = cart;