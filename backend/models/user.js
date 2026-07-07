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
      ref: "foodItem",
    },],
    cart: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodItem",
    },],
  },

  {
    timestamps: true,
  }
);


const Users = mongoose.model("user", userSchema);
module.exports = Users;