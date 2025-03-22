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
    const orders = await OrderModel.find({
      "list_of_items.saler_id": saler_id,
    }).sort({
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

orderRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const data = await OrderModel.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated user
      runValidators: true, // Apply validation rules
    });

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json({ message: "Order updated successfully", prod: data });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// delete order
// orderRouter.delete("/deleteAll", async (req, res) => {
//   try {
//     await OrderModel.deleteMany({});
//     res.status(200).json({ message: "All items deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting items", error });
//   }
// });

orderRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await OrderModel.findById(id);

    await OrderModel.findByIdAndDelete(id);

    res.status(201).json({ message: "Product Deleted Successfully!", data });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = orderRouter;
