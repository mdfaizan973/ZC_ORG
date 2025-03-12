const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    user_feedback_to_prod: { type: String, required: true },
    user_prod_rating: { type: String, required: true, },
    user_profile_img: { type: String, required: false },
    saler_name: { type: String, required: true },
    saler_id: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "user_feedback_date", updatedAt: "updated_at" },
    versionKey: false,
  }
);
const ProductFeedBackModel = mongoose.model("ProdFeedback", feedbackSchema)
module.exports = ProductFeedBackModel;
