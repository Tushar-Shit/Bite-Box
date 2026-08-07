import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    tokenVersion: {
      type: Number,
      required: true,
      default:0,
    },
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
    mobile: {
      type: Number,
      unique: true,
      trim: true,
    },
    address1: String,
    address2: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
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
export default Users;