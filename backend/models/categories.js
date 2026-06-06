const mongoose = require("mongoose");
const categories = new mongoose.Schema({
    name: String,
    image: String,
    items: Number,
});

const Category = mongoose.model("category", categories);
module.exports = Category;