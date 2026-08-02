// from 'dotenv').config({ path: from 'path').resolve(__dirname, '../.env') });
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import categoryData from "./categoryData";
import foodData from "./Fooddata";
import reviewData from "./reviewData";
import mongoose from "mongoose";
import Category from "../models/categories";
import FoodItems from "../models/foodItem";
import Reviews from "../models/reviews";
// from 'dotenv').config();



const app = express();
mongoose.connect(process.env.DB_URL)
    .then(() => console.log(" Successfully connected to MongoDB!"))
    .catch((err) => console.error(" MongoDB connection error:", err));


const dataSave = async () => {
    try {
        // await Category.deleteMany({});
        await FoodItems.deleteMany({});
        // await Reviews.deleteMany({});
        console.log("previous data deleted");
        // await Category.insertMany(categoryData);
        await FoodItems.insertMany(foodData);
        // await Reviews.insertMany(reviewData);
        console.log("Data Inserted");

    }
    catch (err) {
        console.log(err);
    }
}
dataSave();