const mongoose = require("mongoose");

const SalerSchema = new mongoose.Schema(
  {
    saler_name: { type: String, required: true },
    saler_email: { type: String, required: true },
    saler_business_name: { type: String, required: true },
    sell_description: { type: String, required: false },
  },
  {
    timestamps: { createdAt: "applied_date", updatedAt: "updated_at" },
    versionKey: false,
  }
);

const SalerSchemaModal = mongoose.model("salerDetils", SalerSchema);
module.exports = SalerSchemaModal;
