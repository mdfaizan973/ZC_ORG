const express = require("express");
const OrderModel = require("../models/OrderModel");
const orderRouter = express.Router();

orderRouter.get("/", async (req, res) => {
  try {
    // user_id find by
    const orders = await OrderModel.find().sort({ order_date: +1 });
    res.status(201).json(orders);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

orderRouter.post("/", async (req, res) => {
  try {
    const order = new OrderModel(req.body);
    await order.save();
    res.status(201).json({ message: "Order done successfully", order });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = orderRouter;
