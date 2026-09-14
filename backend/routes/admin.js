import express from "express";
import Order from "../models/order";
import authMiddleware from "../middleware/authentication";
import asyncHandler from "../middleware/asyncHandler";
const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
    console.log("inside admin route");
    res.json({ message: "admin route" })
});


router.post("/orders", asyncHandler(async (req, res) => {
    const { date } = req.body;
    const start = new Date(`${date}T00:00:00.000Z`);
    const end = new Date(`${date}T00:00:00.000Z`);
    end.setUTCDate(end.getUTCDate() + 1);

    const data = await Order.find({
        createdAt: {
            $gte: start,
            $lt: end
        }
    })

    if (data.length === 0) { return res.json({ message: "No order yet" }); }
    res.json({ data })

}))

router.patch("/orders", asyncHandler(async (req, res) => {
    const { orderId, code } = req.body;
    if (code === "Accepted") {
        const order = await Order.findOne({ orderId });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = "Preparing";
        await order.save();
        return res.json({ message: "Order Accepted", order });
    }
    else if (code === "Rejected") {
        const order = await Order.findOne({ orderId });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = "Rejected";
        await order.save();
        return res.json({ message: "Order Rejected", order });
    }
}));

router.patch("/preparing-orders", asyncHandler(async (req, res) => {
    const { orderId, status } = req.body;
    console.log(orderId, status);
    if (status === "Out for Delivery") {
        const order = await Order.findOne({ orderId });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = status;
        await order.save();
        return res.json({ message: "out of delivery", order });
    }
}));


router.get("/orders/search/:query", asyncHandler(async (req, res) => {
    const { query } = req.params;
    console.log(query)
    const data = await Order.find({
        $or: [
            { orderId: { $regex: query, $options: "i" } },
            { customerName: { $regex: query, $options: "i" } },
            { mobile: { $regex: query, $options: "i" } }
        ]
    });
    console.log(data);
    res.json({ data });
}));

export default router;