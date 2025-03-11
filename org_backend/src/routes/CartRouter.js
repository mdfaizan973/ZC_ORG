const express = require("express");
const CartSchemaModel = require("../models/CartModel");
const cartRouter = express.Router();
// const CartSchemaModel

cartRouter.get("/", async (req, res) => {
  try {
    const produtData = await CartSchemaModel.find();

    res.status(200).json(produtData);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    const product = new CartSchemaModel(req.body);

    await product.save();
    res.status(201).json({ message: "Cart Added Successfully!", product });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = cartRouter;
