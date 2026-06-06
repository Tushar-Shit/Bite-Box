const mongoose = require("mongoose");
const categories = new mongoose.Schema({
    name: String,
    image: String,
    
});

const Category = mongoose.model("category", categories);
module.exports = Category;