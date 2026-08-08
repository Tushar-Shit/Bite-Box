import express from "express";
import authentication from "../middleware/authentication";
import { favourite, updateFavourite, getCart, addAndDelete, updateCart } from "../controllers/updateController.js";
const router = express.Router({ mergeParams: true });


router.get("/favourite", authentication, favourite);  //return all favourite foods
router.post("/favourite", authentication, updateFavourite);// add or remove items


router.get("/cart", authentication, getCart);
router.post("/cart", authentication, addAndDelete);
router.patch("/cart", authentication, updateCart);

export default router;