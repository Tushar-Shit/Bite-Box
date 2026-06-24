const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
    favourites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItems",
    }],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);