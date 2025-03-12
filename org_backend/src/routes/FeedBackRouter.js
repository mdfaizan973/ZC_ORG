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
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get all feedbacks
feedbackRouter.get("/", async (req, res) => {
  try {
    const feedbacks = await ProductFeedBackModel.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get feedback for a specific product
feedbackRouter.get("/:productId", async (req, res) => {
  try {
    const feedbacks = await ProductFeedBackModel.find({ product_id: req.params.productId });
    if (!feedbacks.length) {
      return res.status(404).json({ message: "No feedback found for this product" });
    }
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete a feedback by ID
feedbackRouter.delete("/:id", async (req, res) => {
  try {
    const deletedFeedback = await ProductFeedBackModel.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = feedbackRouter;
