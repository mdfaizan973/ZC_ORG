const express = require("express");
const OrderModel = require("../models/OrderModel");
const orderRouter = express.Router();

// get all order
orderRouter.get("/", async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ order_date: -1 });
    res.status(201).json(orders);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get order for User
orderRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // user_id find by
    const orders = await OrderModel.find({ user_id: userId }).sort({
      order_date: -1,
    });
    res.status(201).json(orders);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get order of Saler
orderRouter.get("/:saler_id", async (req, res) => {
  const { saler_id } = req.params;
  try {
    // user_id find by
    const orders = await OrderModel.find({ "list_of_items.saler_id": saler_id }).sort({
      order_date: -1,
    });
    res.status(201).json(orders);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// post order
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

// delete order
orderRouter.delete("/deleteAll", async (req, res) => {
  try {
    await OrderModel.deleteMany({});
    res.status(200).json({ message: "All items deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting items", error });
  }
});

module.exports = orderRouter;
