const Product = require("../models/Product");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, stock, category } = req.body;

    if (!name || price == null || stock == null) {
      const error = new Error("name, price and stock are required");
      error.statusCode = 400;
      throw error;
    }

    const product = await Product.create({
      name,
      price,
      stock,
      category,
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};
