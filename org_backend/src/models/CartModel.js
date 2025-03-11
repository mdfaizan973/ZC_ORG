// const mongoose = require("mongoose");
// const ProductSchemaModel = require("./ProductsModel");
// const CartSchema = new mongoose.Schema(
//   {
//     ...ProductSchemaModel.obj,
//     userId: { type: String, required: true },
//     userName: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const CartSchemaModel = mongoose.model("cartProduct", CartSchema);
// module.exports = CartSchemaModel;

const mongoose = require("mongoose");
const ProductSchemaModel = require("./ProductsModel");
// Extract only the schema definition (not the model)
const ProductSchemaModelDefinition = ProductSchemaModel.schema.obj;

const CartSchema = new mongoose.Schema(
  {
    ...ProductSchemaModelDefinition,
    userId: { type: String, required: true },
    userName: { type: String, required: true },
  },
  { timestamps: true }
);

const CartSchemaModel = mongoose.model("cartProduct", CartSchema);
module.exports = CartSchemaModel;

