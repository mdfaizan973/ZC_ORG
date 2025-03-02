const express = require("express");
const ProductSchemaModel = require("../models/ProductsModel");
const ProductsRouter = express.Router();

// TODO:- use auth middleware for the token;

ProductsRouter.get("/", async (req, res) => {
  try {
    const produtData = await ProductSchemaModel.find();

    res.status(200).json(produtData);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

ProductsRouter.post("/", async (req, res) => {
  try {
    const product = new ProductSchemaModel(req.body);
    await product.save();
    res.status(201).json({ message: "Product Added Successfully!", product });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = ProductsRouter;
