const express = require("express");
const app = express();
const port = 7000;
const cors = require("cors");
const mongoose = require("mongoose");
const Category = require("./models/categories");
require('dotenv').config();
mongoose.connect(process.env.DB_URL)
    .then(() => console.log(" Successfully connected to MongoDB!"))
    .catch((err) => console.error(" MongoDB connection error:", err));

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    const data = {
        heroImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzvMyociTNf4UqFHzh5Iu5503ne7cfJkLbg&s",
        text: "Sink your teeth into the juiciest, flavor-packed bite your cravings have been waiting for.",
    };
    res.json(data.heroImage);
});

app.get("/categories", async (req, res) => {
    const categoriesData = await Category.find();
    // console.log(categoriesData);
    res.json(categoriesData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});