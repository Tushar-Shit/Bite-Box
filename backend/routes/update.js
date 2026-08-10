import express from "express";
import authentication from "../middleware/authentication";
import { favourite, updateFavourite, getCart, addAndDelete, updateCart, searchFood } from "../controllers/updateController.js";
const router = express.Router({ mergeParams: true });


router.get("/favourite", authentication, favourite);  //return all favourite foods
router.post("/favourite", authentication, updateFavourite);// add or remove items


router.get("/cart", authentication, getCart);   //return cart data
router.post("/cart", authentication, addAndDelete); //add or delete
router.patch("/cart", authentication, updateCart);  //incease or decrease

router.get("/search/:text", searchFood);
export default router;