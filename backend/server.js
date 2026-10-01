import dotenv from "dotenv";

dotenv.config();


// ======================================================
// NECESSARY COMPONENTS
// ======================================================

import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";


// ======================================================
// DATABASE
// ======================================================

import connectDB from "./config/db.js";


// ======================================================
// MODELS
// ======================================================

import Category from "./models/categories.js";
import FoodItem from "./models/foodItem.js";
import Reviews from "./models/reviews.js";
import Users from "./models/user.js";
import Cart from "./models/cart.js";
import Order from "./models/order.js";


// ======================================================
// ROUTES
// ======================================================

import authentication from "./routes/auth.js";
import categoryRoute from "./routes/category.js";
import reviewRoute from "./routes/reviews.js";
import userRoute from "./routes/user.js";
import updateRoute from "./routes/update.js";
import adminRoute from "./routes/admin.js";


// ======================================================
// MIDDLEWARE
// ======================================================

import checkAuth from "./middleware/authentication.js";
import errorHandler from "./middleware/errorHandler.js";


// ======================================================
// SOCKET.IO HELPER
// ======================================================

import { setIO } from "./socket.js";


// ======================================================
// EXPRESS APP
// ======================================================

const app = express();

const port = process.env.PORT || 7000;


// ======================================================
// ALLOWED FRONTEND ORIGINS
// ======================================================

const allowedOrigins = [
    "http://10.90.88.131:5173",
    "http://10.90.88.131:5174",
    "http://172.30.22.131:5173",
    "https://bite-box-ten.vercel.app",
];


// ======================================================
// HTTP SERVER
// ======================================================

const server = http.createServer(app);


// ======================================================
// SOCKET.IO
// ======================================================

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
    },
});


// Give Socket.IO instance to other route files
setIO(io);


// ======================================================
// SOCKET CONNECTION
// ======================================================

io.on("connection", (socket) => {

    console.log(
        "Socket connected:",
        socket.id
    );


    // ==================================================
    // ADMIN ROOM
    // ==================================================

    socket.on("joinAdmin", () => {

        socket.join("admins");

        console.log(
            `Admin joined admin room: ${socket.id}`
        );

    });


    // ==================================================
    // CUSTOMER ROOM
    // ==================================================

    socket.on("joinUser", (userId) => {

        if (!userId) {
            return;
        }

        socket.join(`user:${userId}`);

        console.log(
            `User ${userId} joined room`
        );

    });


    // ==================================================
    // DISCONNECT
    // ==================================================

    socket.on("disconnect", (reason) => {

        console.log(
            `Socket disconnected: ${socket.id} | Reason: ${reason}`
        );

    });

});


// ======================================================
// DATABASE CONNECTION
// ======================================================

connectDB();


// ======================================================
// EXPRESS MIDDLEWARE
// ======================================================

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

app.use(express.json());

app.use(cookieParser());


// ======================================================
// HOME ROUTE
// ======================================================

app.get("/", async (req, res, next) => {

    try {

        const trendingFood = await FoodItem
            .find({
                tag: "trending"
            })
            .limit(5)
            .populate("rating");


        const popularFood = await FoodItem
            .find({
                tag: "popular"
            })
            .limit(4)
            .populate("rating");


        const recommendedFood = await FoodItem
            .find({
                tag: "recommended"
            })
            .limit(4)
            .populate("rating");


        const bestSellerFood = await FoodItem
            .find({
                tag: "bestseller"
            })
            .limit(5)
            .populate("rating");


        const chefChoiceFood = await FoodItem
            .find({
                tag: "chefchoice"
            })
            .limit(4)
            .populate("rating");


        const everything = {
            trendingFood,
            popularFood,
            recommendedFood,
            bestSellerFood,
            chefChoiceFood
        };


        return res.json(
            everything
        );

    } catch (error) {

        next(error);

    }

});


// ======================================================
// MULTIPLE ROUTES
// ======================================================

app.use(
    "/categories",
    categoryRoute
);

app.use(
    "/auth",
    authentication
);

app.use(
    "/user",
    userRoute
);

app.use(
    "/update",
    updateRoute
);

app.use(
    "/reviews",
    reviewRoute
);

app.use(
    "/admin",
    adminRoute
);


// ======================================================
// TAG ROUTE
// ======================================================

app.get(
    "/tag/:anything",
    async (req, res, next) => {

        try {

            const {
                anything
            } = req.params;


            const fooditems = await FoodItem.find({
                tag: anything
            });


            return res.json({
                fooditems
            });

        } catch (error) {

            next(error);

        }

    }
);


// ======================================================
// MEAL DETAILS
// ======================================================

app.get(
    "/meal/:id",
    async (req, res, next) => {

        try {

            const {
                id
            } = req.params;


            console.log(
                "Meal ID:",
                id
            );


            const foodItem =
                await FoodItem.findById(id);


            const ratings =
                await Reviews.find({
                    food_belong: id
                });


            const reviews =
                ratings.filter(
                    item => item.comment
                );


            return res.json({
                foodItem,
                ratings,
                reviews
            });

        } catch (error) {

            next(error);

        }

    }
);


// ======================================================
// GET CURRENT USER'S ORDERS
// ======================================================

app.get(
    "/order",
    checkAuth,
    async (req, res, next) => {

        try {

            const user =
                req.user;


            const data =
                await Order.find({
                    customerId: user
                }).sort({
                    createdAt: -1
                });


            if (data.length === 0) {

                return res.json({
                    message: "No order yet",
                    data: []
                });

            }


            return res.json({
                data
            });

        } catch (error) {

            next(error);

        }

    }
);


// ======================================================
// CREATE ORDER
// ======================================================

app.post(
    "/order",
    checkAuth,
    async (req, res, next) => {

        try {

            const {
                food,
                deliveryCharge,
                amount,
                finalAmount,
                customerName,
                mobile,
                location,
                paymentMode
            } = req.body;


            // ==================================================
            // BASIC VALIDATION
            // ==================================================

            if (
                !food ||
                !Array.isArray(food) ||
                food.length === 0
            ) {

                return res.status(400).json({
                    message: "Order items are required"
                });

            }


            if (!mobile) {

                return res.status(400).json({
                    message: "Mobile number is required"
                });

            }


            // ==================================================
            // GENERATE ORDER ID
            // ==================================================

            const date = new Date();


            const formattedDate =
                String(
                    date.getDate()
                ).padStart(2, "0") +

                String(
                    date.getMonth() + 1
                ).padStart(2, "0") +

                String(
                    date.getFullYear()
                ).slice(-2);


            const lastFour =
                mobile
                    .toString()
                    .slice(-4);


            const random =
                Math.floor(
                    Math.random() * 100
                ) + 1;


            const orderId =
                `${formattedDate}-${random}-${lastFour}`;


            // ==================================================
            // DEFAULT STATUS
            // ==================================================

            const status = "Pending";


            // ==================================================
            // CREATE ORDER IN DATABASE
            // ==================================================

            const order =
                await Order.create({

                    items: food,

                    customerId:
                        req.user,

                    orderId,

                    status,

                    deliveryCharge,

                    amount,

                    finalAmount,

                    customerName,

                    mobile,

                    location,

                    paymentMode

                });


            // ==================================================
            // REAL-TIME → ALL ADMINS
            // ==================================================

            io.to("admins").emit(
                "newOrder",
                order
            );


            // ==================================================
            // REAL-TIME → CUSTOMER
            // ==================================================

            io.to(
                `user:${req.user}`
            ).emit(
                "orderCreated",
                order
            );


            return res.status(201).json({

                message:
                    "Your order has been placed successfully.",

                order

            });

        } catch (error) {

            next(error);

        }

    }
);


// ======================================================
// GET ORDER BY ORDER ID
// ======================================================

app.get(
    "/order/status/:orderId",
    async (req, res, next) => {

        try {

            const { orderId } = req.params;


            const order = await Order.findOne({ orderId });
            // console.log(order.items[0].foodId)
            const reviews = await Reviews.find({ orderId: order._id }).populate('food_belong');
            // console.log("reviews", reviews);
            // console.log("order", order);
            if (!order) {

                return res.status(404).json({
                    message: "Order not found"
                });

            }
            const foodId = order.items[0].foodId;


            return res.json({
                order, reviews
            });

        } catch (error) {

            next(error);

        }

    }
);


// ======================================================
// UPDATE ORDER STATUS
// ======================================================

app.patch(
    "/order/status/:orderId",
    async (req, res, next) => {

        try {

            const {
                orderId
            } = req.params;


            const {
                status
            } = req.body;


            // ==================================================
            // VALIDATE STATUS
            // ==================================================

            const allowedStatuses = [
                "Pending",
                "Preparing",
                "Out for Delivery",
                "Delivered",
                "Rejected",
                "Cancelled"
            ];


            if (
                !status ||
                !allowedStatuses.includes(status)
            ) {

                return res.status(400).json({
                    message: "Invalid order status"
                });

            }


            // ==================================================
            // UPDATE DATABASE
            // ==================================================

            const order =
                await Order.findOneAndUpdate(

                    {
                        orderId
                    },

                    {
                        status
                    },

                    {
                        new: true,
                        runValidators: true
                    }

                );


            if (!order) {

                return res.status(404).json({
                    message: "Order not found"
                });

            }


            console.log(
                `Order ${orderId} status changed to ${status}`
            );


            // ==================================================
            // REAL-TIME → ALL ADMINS
            // ==================================================

            io.to("admins").emit(
                "orderStatusUpdated",
                order
            );


            // ==================================================
            // REAL-TIME → CUSTOMER
            // ==================================================

            if (order.customerId) {

                io.to(
                    `user:${order.customerId}`
                ).emit(
                    "orderStatusUpdated",
                    order
                );

            }


            return res.json({

                order,

                message:
                    "Order status updated successfully"

            });

        } catch (error) {

            next(error);

        }

    }
);


// ======================================================
// HEALTH CHECK
// ======================================================

app.get(
    "/health",
    (req, res) => {

        return res
            .status(200)
            .json({

                code: "success",

                message:
                    "Active successfully."

            });

    }
);


// ======================================================
// ERROR HANDLER
// ======================================================

app.use(
    errorHandler
);


// ======================================================
// START HTTP + SOCKET.IO SERVER
// ======================================================

// IMPORTANT:
// Do NOT use:
//
// app.listen(...)
//
// Socket.IO is attached to `server`, therefore
// the HTTP server must be started with server.listen().

server.listen(
    port,
    () => {

        console.log(
            `Server is running on port ${port}`
        );

    }
);

