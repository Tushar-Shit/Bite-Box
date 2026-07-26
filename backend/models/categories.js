import mongoose from "mongoose";
const categories = new mongoose.Schema({
    name: String,
    image: String,
    
});

const Category = mongoose.model("category", categories);
export default Category;