
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  price_mrp: { type: Number },
  price_discounted: { type: Number },
  discount_type: { type: String, enum: ['NONE', 'SEASONAL', 'FLAT'] },
  photos: [String],
  is_featured: { type: Boolean, default: false },
  stock_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
