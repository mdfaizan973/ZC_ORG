const express = require("express");
const ProductSchemaModel = require("../models/ProductsModel");
const ProductsRouter = express.Router();

const multer = require("multer");
const xlsx = require("xlsx");

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });
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

ProductsRouter.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Check if the uploaded file is named "sample_products.xlsx"
    // if (req.file.originalname !== "sample_products.xlsx") {
    //     return res.status(400).json({ message: "Please upload a file named sample_products.xlsx" });
    // }

    // Read Excel file
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    let sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
      defval: null,
    });

    const insertedData = await ProductSchemaModel.insertMany(sheetData);

    res
      .status(201)
      .json({ message: "Products uploaded successfully", data: insertedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

ProductsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await ProductSchemaModel.findById(id);

    await ProductSchemaModel.findByIdAndDelete(id);

    res.status(201).json({ message: "Product Deleted Successfully!", data });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

ProductsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const data = await ProductSchemaModel.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated user
      runValidators: true, // Apply validation rules
    });

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res
      .status(200)
      .json({ message: "Produt updated successfully", prod: data });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// get single data
ProductsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleData = await ProductSchemaModel.findById(id);
    res.status(200).json(singleData);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = ProductsRouter;
