import express from "express";
import authentication from "../middleware/authentication.js";
import {
    profile,
    addfav,
    favourite,
    getCart,
    updateCart
} from "../controllers/userController.js";

const router = express.Router({ mergeParams: true });

router.get("/profile", authentication, profile);

router.post("/addfav", authentication, addfav);

router.get("/favourite", authentication, favourite);

router.get("/cart", authentication, getCart);

router.post("/cart", authentication, updateCart);

export default router;