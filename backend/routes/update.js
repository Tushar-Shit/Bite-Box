import express from "express";
import authentication from "../middleware/authentication";
import { favourite, updateFavourite } from "../controllers/updateController.js";
const router = express.Router({ mergeParams: true });


router.get("/favourite", authentication, favourite);  //return all favourite foods
router.post("/favourite", authentication, updateFavourite);// add or remove items


export default router;