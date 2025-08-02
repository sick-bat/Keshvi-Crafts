const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const seed = require("../seed");

// GET all products (with optional filters)
router.get("/", async (req, res) => {
  try {
        console.log("➡️  API hit: /api/products");
        
    const { category, search } = req.query;
    let query = {};
    if (category) query.category = category;
    if (search) query.title = new RegExp(search, "i");
    const products = await Product.find(query);
     console.log("📦 Products found:", products.length);
    res.json(products);
  } catch (err) {
        console.error("❌ Failed to fetch products:", err.message);
    console.error("failed due to : ",err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
        console.error("failed due to : ",err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Seed preview (optional)
router.get("/seed", (req, res) => {
  res.json(seed);
});

module.exports = router;
