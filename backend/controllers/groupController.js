
const ProductGroup = require('../models/ProductGroup');

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await ProductGroup.find().populate('product_ids');
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const group = new ProductGroup(req.body);
    const saved = await group.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
