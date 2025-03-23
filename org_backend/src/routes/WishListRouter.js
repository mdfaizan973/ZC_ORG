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

wishListRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const wishlistProd = await WishListSchemaModel.find({
      user_id: id,
    });

    res.status(201).json(wishlistProd);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

wishListRouter.post("/", async (req, res) => {
  const { product_id } = req.body;

  try {
    const isWishListPresent = await WishListSchemaModel.findOne({ product_id });

    if (isWishListPresent) {
      return res
        .status(201)
        .json({ message: "Already present in the Wishlist!" });
    }

    const wishlistProd = new WishListSchemaModel(req.body);
    await wishlistProd.save();
    res.status(201).json({ message: "WishList Added", wishlistProd });
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

    res.status(201).json({ message: "WishList Removed", deletedWishList });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = wishListRouter;
