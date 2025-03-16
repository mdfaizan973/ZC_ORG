const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const UserRouter = require("./routes/UserRouter");
const ProductsRouter = require("./routes/ProductRouter");
const cartRouter = require("./routes/CartRouter");
const feedbackRouter = require("./routes/FeedBackRouter");
const questionRouter = require("./routes/questionRouter");
const wishListRouter = require("./routes/WishListRouter");
const salerRouter = require("./routes/SalerRouter");
const invoiceDownloadRouter = require("./routes/InvoiceDownloadRouter");
const orderRouter = require("./routes/OrderRouter");
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  try {
    res.status(201).send({ message: "Hello, world!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use("/api/users", UserRouter);
app.use("/api/products", ProductsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/product-feedback", feedbackRouter);
app.use("/api/product-question", questionRouter);
app.use("/api/product-wishlist", wishListRouter);
app.use("/api/saler", salerRouter);
app.use("/api/invoices", invoiceDownloadRouter);
app.use("/api/orders", orderRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
