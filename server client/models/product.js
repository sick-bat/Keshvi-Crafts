const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  imageUrl: String,
  category: String,
  stock: {
    type: Number,
    default: 1,
  },
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);

