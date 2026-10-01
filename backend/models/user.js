import mongoose from "mongoose";
const addressOption = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  }
}, { _id: false });


const userSchema = new mongoose.Schema(
  {
    tokenVersion: {
      type: Number,
      required: true,
      default: 0,
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
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    address: [addressOption],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    favourites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodItem",
    },],
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
    },
    lastDeliveryAddress: {
      customerName: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      mobile: {
        type: String,
        required: true
      }
    }
  },

  {
    timestamps: true,
  }
);


const Users = mongoose.model("user", userSchema);
export default Users;