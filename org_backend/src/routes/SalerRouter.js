const express = require("express");
const salerRouter = express.Router();
const SalerSchemaModal = require("../models/SalerModel");
const UserModel = require("../models/UserModel");

// ✅ Create a new question
salerRouter.post("/", async (req, res) => {
  try {
    const { saler_email } = req.body;
    const isUser = await UserModel.findOne({ email: saler_email });
    console.log(isUser);
    if (isUser) {
      const post_saler = new SalerSchemaModal(req.body);
      await post_saler.save();
      res.status(201).json({
        message: "Successfully Applied! You will have access after 24HR",
        isUser,
      });
    } else {
      res.status(201).json({ message: "Email not found! Use existing Email!" });
    }
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

salerRouter.delete("/:id", async (req, res) => {
  try {
    const delete_saler = await SalerSchemaModal.findByIdAndDelete(
      req.params.id
    );
    if (!delete_saler) {
      return res.status(200).json({ message: "Saler not found" });
    }
    res.status(200).json({ message: "Saler deleted successfully" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = salerRouter;
