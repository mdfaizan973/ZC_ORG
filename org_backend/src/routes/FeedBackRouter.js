const express = require("express");
const feedbackRouter = express.Router();
const ProductFeedBackModel = require("../models/ProductFeedBackModel");
// ✅ Create a new feedback
feedbackRouter.post("/", async (req, res) => {
  try {
    const feedback = new ProductFeedBackModel(req.body);
    await feedback.save();
    res.status(201).json({ message: "Feedback added successfully", feedback });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Get all feedbacks
feedbackRouter.get("/", async (req, res) => {
  try {
    const feedbacks = await ProductFeedBackModel.find();
    res.status(201).json(feedbacks);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Get feedback for a specific product
feedbackRouter.get("/:productId", async (req, res) => {
  try {
    const feedbacks = await ProductFeedBackModel.find({ product_id: req.params.productId });
    if (!feedbacks.length) {
      return res.status(201).json({ message: "No feedback found for this product" });
    }
    res.status(201).json(feedbacks);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Delete a feedback by ID
feedbackRouter.delete("/:id", async (req, res) => {
  try {
    const deletedFeedback = await ProductFeedBackModel.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(201).json({ message: "Feedback not found" });
    }
    res.status(201).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = feedbackRouter;
