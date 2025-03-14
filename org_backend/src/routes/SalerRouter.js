const express = require("express");
const salerRouter = express.Router();
const SalerSchemaModal = require("../models/SalerModel");

// ✅ Create a new question
salerRouter.post("/", async (req, res) => {
  try {
    const post_saler = new SalerSchemaModal(req.body);
    await post_saler.save();
    res.status(201).json({
      message: "Successfully Applied! You will have access after 24HR",
      post_saler,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Get all salers
salerRouter.get("/", async (req, res) => {
  try {
    const get_saler = await SalerSchemaModal.find();
    res.status(201).json(get_saler);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = salerRouter;
