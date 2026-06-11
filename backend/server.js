const express = require("express");
const app = express();
const port = 7000;
const cors = require("cors");
const mongoose = require("mongoose");
const Category = require("./models/categories");
const FoodItem = require("./models/foodItem");
const Reviews = require("./models/reviews");

//routes
const categoryRoute = require("./routes/category");
const reviewRoute = require("./routes/reviews");


require('dotenv').config();
mongoose.connect(process.env.DB_URL)
    .then(() => console.log(" Successfully connected to MongoDB!"))
    .catch((err) => console.error(" MongoDB connection error:", err));

app.use(cors());
app.use(express.json());


app.get("/", async (req, res) => {
    const data = {
        heroImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzvMyociTNf4UqFHzh5Iu5503ne7cfJkLbg&s",
        text: "Sink your teeth into the juiciest, flavor-packed bite your cravings have been waiting for.",
    };
    trendingFood = await FoodItem.find({tag:"Trending"});
    popularFood = await FoodItem.find({tag:"Popular"});
    // console.log(trendingFood);
    
    const everything = {
        data,
        trendingFood,
        popularFood,
    }
    res.json(everything);
});

app.use("/categories", categoryRoute);
app.use("/reviews", reviewRoute);


app.get("/meal/:id", async (req, res) => {
    const { id } = req.params;
    const foodItem = await FoodItem.findById(id);
    const reviews = await Reviews.find({ food_belong: id });

    res.json({ foodItem, reviews });
})


// Added "/api" to match your front-end fetch exactly
app.get("/type/:anything", async (req, res) => {
    const { anything } = req.params;
console.log(anything);
    const fooditems = await FoodItem.find({ tag:anything});
    res.json({ fooditems });
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});