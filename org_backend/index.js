const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const UserRouter = require("./src/routes/UserRouter");
const ProductsRouter = require("./src/routes/ProductRouter");
const cartRouter = require("./src/routes/CartRouter");
const feedbackRouter = require("./src/routes/FeedBackRouter");
const questionRouter = require("./src/routes/questionRouter");
const wishListRouter = require("./src/routes/WishListRouter");
const salerRouter = require("./src/routes/SalerRouter");
const invoiceDownloadRouter = require("./src/routes/InvoiceDownloadRouter");
const orderRouter = require("./src/routes/OrderRouter");
const bugReportRouter = require("./src/routes/BugReportRouter");
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
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/uploads", express.static("uploads"));

app.use("/api/users", UserRouter);
app.use("/api/products", ProductsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/product-feedback", feedbackRouter);
app.use("/api/product-question", questionRouter);
app.use("/api/product-wishlist", wishListRouter);
app.use("/api/saler", salerRouter);
app.use("/api/invoices", invoiceDownloadRouter);
app.use("/api/orders", orderRouter);
app.use("/api/bug-report", bugReportRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
