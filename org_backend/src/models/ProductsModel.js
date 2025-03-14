const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    price_inr: { type: Number, required: true },
    discount_price_inr: { type: Number, required: false },
    discount_percentage: { type: Number, required: false },
    ETA: { type: String, required: false },
    health_benefits_rich_in_vitamins_and_antioxidants: {
      type: Boolean,
      required: false,
    },
    health_benefits_improves_immunity: { type: Boolean, required: false },
    health_benefits_enhances_skin_health: { type: Boolean, required: false },
    certified_organic: { type: Boolean, required: false },
    organic_certification_body: { type: String, required: false },
    sustainability: { type: String, required: false },
    pesticide_free: { type: Boolean, required: false },
    non_GMO: { type: Boolean, required: false },
    fair_trade_certified: { type: Boolean, required: false },
    gluten_free: { type: Boolean, required: false },
    vegan: { type: Boolean, required: false },
    raw: { type: Boolean, required: false },
    local_source: { type: Boolean, required: false },
    organic_ingredients: { type: [String], required: false },
    harvested_by_hand: { type: Boolean, required: false },
    cruelty_free: { type: Boolean, required: false },
    expiration_date: { type: String, required: false },
    storage_instructions: { type: String, required: false },
    saler_email: { type: String, required: true },
    saler_id: { type: String, required: true },
    saler_name: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const ProductSchemaModel = mongoose.model("Products", ProductSchema);
module.exports = ProductSchemaModel;
