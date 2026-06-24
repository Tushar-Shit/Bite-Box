require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require("express");
const app = express();
const categoryData= require("./categoryData");
const foodData= require("./Fooddata");
const reviewData=require("./reviewData");
const mongoose = require("mongoose");
const Category = require("../models/categories");
const FoodItems = require("../models/foodItem");
const Reviews = require("../models/reviews");
require('dotenv').config();
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