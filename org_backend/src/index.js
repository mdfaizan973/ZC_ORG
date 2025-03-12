const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const UserRouter = require("./routes/UserRouter");
const ProductsRouter = require("./routes/ProductRouter");
const cartRouter = require("./routes/CartRouter");
const feedbackRouter = require("./routes/FeedBackRouter");
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
app.use("/api/feedback", feedbackRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
