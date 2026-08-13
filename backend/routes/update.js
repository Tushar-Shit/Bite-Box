import express from "express";
import authentication from "../middleware/authentication";
import { favourite, updateFavourite, getCart, addAndDelete, updateCart, searchFood } from "../controllers/updateController.js";
import asyncHandler from "../middleware/asyncHandler.js";
const router = express.Router({ mergeParams: true });


router.get("/favourite", authentication, asyncHandler(favourite));  //return all favourite foods
router.post("/favourite", authentication, asyncHandler(updateFavourite));// add or remove items


router.get("/cart", authentication, asyncHandler(getCart));   //return cart data
router.post("/cart", authentication, asyncHandler(addAndDelete)); //add or delete
router.patch("/cart", authentication, asyncHandler(updateCart));  //incease or decrease

router.get("/search/:text", asyncHandler(searchFood));
export default router;