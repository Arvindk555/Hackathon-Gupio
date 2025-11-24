const Order = require("../models/Order");
const Product = require("../models/Product");

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("items.productId", "name price")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.productId",
      "name price"
    );
    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      const error = new Error("Order items are required");
      error.statusCode = 400;
      throw error;
    }

    // Fetch all products involved
    const productIds = items.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    // Map by id for quick lookup
    const productMap = {};
    products.forEach((p) => {
      productMap[p._id.toString()] = p;
    });

    // Validate stock and calculate total
    let totalAmount = 0;

    for (const item of items) {
      const product = productMap[item.productId];
      if (!product) {
        const error = new Error("Product not found in order");
        error.statusCode = 400;
        throw error;
      }
      if (item.qty > product.stock) {
        const error = new Error(
          `Insufficient stock for product: ${product.name}`
        );
        error.statusCode = 400;
        throw error;
      }
      totalAmount += product.price * item.qty;
    }

    // Reduce stock
    for (const item of items) {
      const product = productMap[item.productId];
      product.stock -= item.qty;
      await product.save();
    }

    // Create order
    const order = await Order.create({
      items,
      totalAmount,
      status: "PLACED",
    });

    const populatedOrder = await Order.findById(order._id).populate(
      "items.productId",
      "name price"
    );

    res.status(201).json(populatedOrder);
  } catch (err) {
    next(err);
  }
};
