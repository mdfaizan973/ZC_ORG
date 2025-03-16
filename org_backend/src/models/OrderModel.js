const mongoose = require("mongoose");

// Define Product Order Schema
const ProdOrderSchema = new mongoose.Schema(
  {
    prod_id: { type: String, required: true },
    prod_image: { type: String, required: false },
    prod_name: { type: String, required: true },
    prod_price: { type: Number, required: true },
    prod_category: { type: String, required: true },
    prod_qty: { type: Number, required: true },
    saler_id: { type: String, required: true },
    saler_name: { type: String, required: true },
  },
  { _id: false } // Prevents automatic _id generation for subdocuments
);

// Define Order Schema
const OrderSchema = new mongoose.Schema(
  {
    delivery_date: { type: Date, required: true },
    delivery_options: { type: String, required: true },
    list_of_items: { type: [ProdOrderSchema], required: true },
    order_status: { type: String, required: true },
    payment_method: { type: String, required: true },
    payment_status: { type: String, required: false },
    total_rupees: { type: Number, required: true },
    user_address: { type: String, required: true },
    user_email: { type: String, required: true },
    user_id: { type: String, required: true },
    user_name: { type: String, required: true },
    user_phone_no: { type: String, required: true },
    user_pinCode: { type: String, required: true },
  },
  { timestamps: { createdAt: "order_date" }, versionKey: false }
);

const OrderModel = mongoose.model("orders", OrderSchema);

module.exports = OrderModel;
