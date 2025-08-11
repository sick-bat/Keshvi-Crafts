
const mongoose = require('mongoose');
const Product = require('./models/Product');
const fs = require('fs');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

async function seedProducts() {
  const rawData = fs.readFileSync('products.json');
  const products = JSON.parse(rawData);
  await Product.deleteMany({});
  const inserted = await Product.insertMany(products);
  console.log(`Inserted ${inserted.length} products`);
  mongoose.disconnect();
}

seedProducts();
