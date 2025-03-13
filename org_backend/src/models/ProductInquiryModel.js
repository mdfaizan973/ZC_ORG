const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    user_question_to_prod: { type: String, required: true },
    saler_reply: { type: String, default: "" },
    user_profile_img: { type: String, required: false },
    saler_name: { type: String, required: true },
    saler_id: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "user_question_date", updatedAt: "updated_at" },
    versionKey: false,
  }
);

const ProductQuestionModel = mongoose.model("ProdQuestion", questionSchema);
module.exports = ProductQuestionModel;
