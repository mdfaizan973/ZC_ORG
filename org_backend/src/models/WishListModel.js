const mongoose = require("mongoose");

const WishListSchema = new mongoose.Schema(
  {
    product_img: { type: String, required: false },
    product_category: { type: String, required: true },
    product_title: { type: String, required: true },
    product_id: { type: String, required: true },
    product_discount_percentage: { type: String, required: true },
    product_discount_price_inr: { type: String, required: true },
    product_saler_name: { type: String, required: true },
    product_saler_id: { type: String, required: true },
    user_name: { type: String, required: true },
    user_id: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "wishlist_date", updatedAt: "updated_at" },
    versionKey: false,
  }
);

const WishListSchemaModel = mongoose.model("Products", WishListSchema);
module.exports = WishListSchemaModel;
