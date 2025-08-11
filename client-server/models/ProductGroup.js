
const mongoose = require('mongoose');

const productGroupSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  product_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  display_order: { type: Number, default: 0 }
});

module.exports = mongoose.model('ProductGroup', productGroupSchema);
