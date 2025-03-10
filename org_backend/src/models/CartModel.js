const mongoose = require("mongoose");
const ProductSchemaModel = require("./ProductsModel");
const CartSchema = new mongoose.Schema(
  {
    ...ProductSchemaModel.obj,
    userId: { type: String, required: true },
    userName: { type: String, required: true },
  },
  { timestamps: true }
);

const CartSchemaModel = mongoose.model("cartProduct", CartSchema);
module.exports = CartSchemaModel;
