require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require("express");
const app = express();
const categoryData= require("./categoryData");
const mongoose = require("mongoose");
const Category = require("../models/categories");
require('dotenv').config();
mongoose.connect(process.env.DB_URL)
    .then(() => console.log(" Successfully connected to MongoDB!"))
    .catch((err) => console.error(" MongoDB connection error:", err));


const dataSave = async () => {
    try {
        await Category.deleteMany({});
        console.log("previous data deleted");
        const register = await Category.insertMany(categoryData);
        console.log(register);
    }
    catch (err) {
        console.log(err);
    }
}
dataSave();