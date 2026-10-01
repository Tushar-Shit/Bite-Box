import express from "express";
import Order from "../models/order.js";
import { getIO } from "../socket.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router({ mergeParams: true });


// =====================================================
// ADMIN TEST ROUTE
// =====================================================

router.post("/", async (req, res) => {
    console.log("inside admin route");

    res.json({
        message: "admin route"
    });
});


// =====================================================
// GET ORDERS BY DATE
// =====================================================

router.post(
    "/orders",
    asyncHandler(async (req, res) => {

        const { date } = req.body;

        const start = new Date(
            `${date}T00:00:00.000Z`
        );

        const end = new Date(
            `${date}T00:00:00.000Z`
        );

        end.setUTCDate(
            end.getUTCDate() + 1
        );

        const data = await Order.find({
            createdAt: {
                $gte: start,
                $lt: end
            }
        }).sort({
            createdAt: -1
        });

        if (data.length === 0) {
            return res.json({
                message: "No order yet",
                data: []
            });
        }

        res.json({
            data
        });

    })
);


// =====================================================
// ACCEPT / REJECT ORDER
// =====================================================

router.patch(
    "/orders",
    asyncHandler(async (req, res) => {

        const {
            orderId,
            code
        } = req.body;


        // -------------------------------------------------
        // ACCEPT ORDER
        // -------------------------------------------------

        if (code === "Accepted") {

            const order = await Order.findOne({
                orderId
            });

            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }

            order.status = "Preparing";

            await order.save();


            // =============================================
            // REAL-TIME UPDATE → ALL ADMINS
            // =============================================

            const io = getIO();

            io.to("admins").emit(
                "orderStatusUpdated",
                order
            );


            // =============================================
            // REAL-TIME UPDATE → CUSTOMER
            // =============================================

            if (order.customerId) {

                io.to(`user:${order.customerId}`).emit(
                    "orderStatusUpdated",
                    order
                );

            }


            return res.json({
                message: "Order Accepted",
                order
            });

        }


        // -------------------------------------------------
        // REJECT ORDER
        // -------------------------------------------------

        if (code === "Rejected") {

            const order = await Order.findOne({
                orderId
            });

            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }

            order.status = "Rejected";

            await order.save();


            // =============================================
            // REAL-TIME UPDATE → ALL ADMINS
            // =============================================

            const io = getIO();

            io.to("admins").emit(
                "orderStatusUpdated",
                order
            );


            // =============================================
            // REAL-TIME UPDATE → CUSTOMER
            // =============================================

            if (order.customerId) {

                io.to(`user:${order.customerId}`).emit(
                    "orderStatusUpdated",
                    order
                );

            }


            return res.json({
                message: "Order Rejected",
                order
            });

        }


        // -------------------------------------------------
        // INVALID ACTION
        // -------------------------------------------------

        return res.status(400).json({
            message: "Invalid order action"
        });

    })
);


// =====================================================
// PREPARING → OUT FOR DELIVERY
// =====================================================

router.patch(
    "/preparing-orders",
    asyncHandler(async (req, res) => {

        const {
            orderId,
            status
        } = req.body;

        console.log(
            "Preparing order:",
            orderId,
            status
        );


        if (status !== "Out for Delivery") {

            return res.status(400).json({
                message: "Invalid order status"
            });

        }


        const order = await Order.findOne({
            orderId
        });

        if (!order) {

            return res.status(404).json({
                message: "Order not found"
            });

        }


        // Update database

        order.status = "Out for Delivery";

        await order.save();


        // =============================================
        // REAL-TIME UPDATE → ALL ADMINS
        // =============================================

        const io = getIO();

        io.to("admins").emit(
            "orderStatusUpdated",
            order
        );


        // =============================================
        // REAL-TIME UPDATE → CUSTOMER
        // =============================================

        if (order.customerId) {

            io.to(`user:${order.customerId}`).emit(
                "orderStatusUpdated",
                order
            );

        }


        return res.json({
            message: "Order is out for delivery",
            order
        });

    })
);


// =====================================================
// OUT FOR DELIVERY → DELIVERED
// =====================================================

router.patch(
    "/delivered",
    asyncHandler(async (req, res) => {

        const {
            orderId
        } = req.body;


        const order = await Order.findOne({
            orderId
        });

        console.log(
            "Delivering order:",
            order
        );


        if (!order) {

            return res.status(404).json({
                message: "Order not found"
            });

        }


        // Update database

        order.status = "Delivered";

        await order.save();


        // =============================================
        // REAL-TIME UPDATE → ALL ADMINS
        // =============================================

        const io = getIO();

        io.to("admins").emit(
            "orderStatusUpdated",
            order
        );


        // =============================================
        // REAL-TIME UPDATE → CUSTOMER
        // =============================================

        if (order.customerId) {

            io.to(`user:${order.customerId}`).emit(
                "orderStatusUpdated",
                order
            );

        }


        return res.json({
            message: "Order Delivered",
            order
        });

    })
);


// =====================================================
// SEARCH ORDERS
// =====================================================

router.get(
    "/orders/search/:query",
    asyncHandler(async (req, res) => {

        const {
            query
        } = req.params;

        console.log(
            "Search query:",
            query
        );


        const data = await Order.find({
            $or: [

                {
                    orderId: {
                        $regex: query,
                        $options: "i"
                    }
                },

                {
                    customerName: {
                        $regex: query,
                        $options: "i"
                    }
                },

                {
                    mobile: {
                        $regex: query,
                        $options: "i"
                    }
                }

            ]
        }).sort({
            createdAt: -1
        });


        console.log(
            "Search results:",
            data
        );


        res.json({
            data
        });

    })
);


export default router;

