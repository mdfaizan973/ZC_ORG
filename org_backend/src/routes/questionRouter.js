const express = require("express");
const questionRouter = express.Router();
const ProductInquiryModel = require("../models/ProductInquiryModel");

// ✅ Create a new question
questionRouter.post("/", async (req, res) => {
  try {
    const question = new ProductInquiryModel(req.body);
    await question.save();
    res.status(201).json({ message: "Question added successfully", question });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Get all questions
questionRouter.get("/", async (req, res) => {
  try {
    const questions = await ProductInquiryModel.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Get questions for a specific product
questionRouter.get("/:productId", async (req, res) => {
  try {
    const questions = await ProductInquiryModel.find({ product_id: req.params.productId });
    if (!questions.length) {
      return res.status(200).json({ message: "No questions found for this product" });
    }
    res.status(200).json(questions);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Update a seller's reply to a question
questionRouter.put("/:id", async (req, res) => {
  try {
    const { saler_reply } = req.body;
    const updatedQuestion = await ProductInquiryModel.findByIdAndUpdate(
      req.params.id,
      { saler_reply },
      { new: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Reply added successfully", updatedQuestion });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Delete a question by ID
questionRouter.delete("/:id", async (req, res) => {
  try {
    const deletedQuestion = await ProductInquiryModel.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      return res.status(200).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = questionRouter;
