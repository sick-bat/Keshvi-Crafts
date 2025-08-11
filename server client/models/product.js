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
  imageUrl: {
    type: [String], // ✅ allow multiple image URLs
    required: true,
    validate: {
      validator: function(arr) {
        return arr.length > 0;
      },
      message: 'At least one image URL is required.'
    }
  },
  category: String,
  stock: {
    type: Number,
    default: 1,
  },
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);


