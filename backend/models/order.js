import mongoose from "mongoose";
const foodItems = new mongoose.Schema({
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodItem",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    _id: false,
});

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    status: {
        type: String,
        required: true,
        trim: true,
    },
    deliveryCharge: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    finalAmount: {
        type: Number,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    paymentMode: {
        type: String,
        required: true,
        trim: true,
    },
    items: [foodItems]
},
    {
        timestamps: true,
    }
);

const Order = mongoose.model("order", orderSchema);
export default Order;