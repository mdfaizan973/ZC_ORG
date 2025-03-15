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

cartRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const produtData = await CartSchemaModel.find({
      userId: id,
    });

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

cartRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await CartSchemaModel.findById(id);

    await CartSchemaModel.findByIdAndDelete(id);

    res.status(201).json({ message: "Cart Deleted Successfully!", data });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = cartRouter;
