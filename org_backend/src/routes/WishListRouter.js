const express = require("express");
const WishListSchemaModel = require("../models/WishListModel");
const wishListRouter = express.Router();

wishListRouter.get("/", async (req, res) => {
  try {
    const wishlist = await WishListSchemaModel.find();
    res.status(201).json(wishlist);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

wishListRouter.get("/:prodId", async (req, res) => {
  try {
    const wishlistProd = await WishListSchemaModel.find({
      product_id: req.params.product_id,
    });

    res.status(201).json(wishlistProd);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

wishListRouter.post("/", async (req, res) => {
  try {
    const wishlistProd = new WishListSchemaModel(req.body);
    await wishlistProd.save();
    res
      .status(201)
      .json({ message: "Wish list added successfully", wishlistProd });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

wishListRouter.delete("/:id", async (req, res) => {
  try {
    const deletedWishList = await WishListSchemaModel.findByIdAndDelete(
      req.params.id
    );

    res
      .status(201)
      .json({ message: "Feedback deleted successfully", deletedWishList });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = wishListRouter;
