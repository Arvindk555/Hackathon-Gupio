const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Simple health check
app.get("/", (req, res) => {
  res.json({ message: "Inventory API is running" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error middleware:", err);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Something went wrong",
  });
});

const PORT = process.env.PORT || 5000;

// Connect DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
