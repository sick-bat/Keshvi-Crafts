const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/product");

// ✅ Use relative URLs so images load correctly from /uploads
const products = [
  {
    title: "Crochet Sunflower Pot",
    description: "Cheerful, handmade sunflower crochet pot, featuring a golden sunflower with green leaves, crafted in eco-friendly yarn. Perfect as a desk, shelf, or windowsill decor piece; requires no maintenance and provides lasting beauty.",
    price: 650,
    imageUrl: [
      "/uploads/Crochet product/Sunflower pot/IMG-20250805-WA0033.jpg",
      "/uploads/Crochet product/Sunflower pot/IMG-20250212-WA0026.jpg",
      "/uploads/Crochet product/Sunflower pot/IMG-20250711-WA0008.jpg",
      "/uploads/Crochet product/Sunflower pot/IMG-20250711-WA0009.jpg",
      "/uploads/Crochet product/Sunflower pot/IMG-20250711-WA0010.jpg",
      "/uploads/Crochet product/Sunflower pot/IMG-20250803-WA0001.jpg",
      "/uploads/Crochet product/Sunflower pot/IMG-20250805-WA0039.jpg"
    ],
    category: "Home decor",
    stock: 10,
  },
  {
    title: "Handmade Crochet Flower Bouquet",
    description: "A vibrant, handcrafted bouquet consisting of a sunflower and tulips, made from high-quality, soft wool yarn. Perfect for gifting or decor.",
    price: 1450,
    imageUrl: [
      "/uploads/Crochet product/Crochet flowers/IMG-20250805-WA0036.jpg",
      "/uploads/Crochet product/Crochet flowers/IMG-20250805-WA0037.jpg"
    ],
    category: "Gifts",
    stock: 10,
  },
  {
    title: "Handmade Crochet Granny Square Bag",
    description: "Colorful, traditional granny square shoulder bag made of durable yarn. Stylish and practical.",
    price: 1100,
    imageUrl: [
      "/uploads/Crochet product/Crochet bag/IMG_20250702_194612_1.jpg"
    ],
    category: "Accessories",
    stock: 8,
  },
  {
    title: "Handmade Crochet Strawberry Hat",
    description: "Playful strawberry-themed crochet hat with red texture and green leafy top. For all ages.",
    price: 500,
    imageUrl: [
      "/uploads/StrawberryHat.png",
      "/uploads/Crochet product/Crochet hat and muffler/Snapchat-1872872800.jpg"
    ],
    category: "Fashion",
    stock: 6,
  },
  {
    title: "Crochet Flower Collection (Rose, Lily, Sunflower, Tulip)",
    description: "Beautifully crafted crochet flowers available in various styles. Great for decor or gifts.",
    price: 300,
    imageUrl: [
      "/uploads/Crochet product/Crochet flowers/IMG_20250801_112357_1.jpg"
    ],
    category: "Artificial Flowers",
    stock: 25,
  },
  {
    title: "Striped Crochet Laptop Cover",
    description: "Handmade striped laptop sleeve in olive and beige. Fits most standard laptops. Stylish and protective.",
    price: 1000,
    imageUrl: [
      "/uploads/Crochet product/Laptop Sleeves/sleeves.png"
    ],
    category: "Laptop Accessories",
    stock: 5,
  },
];



async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    await Product.deleteMany();
    console.log("🗑️ Old products removed");

    await Product.insertMany(products);
    console.log("🌱 New products inserted");

    // await mongoose.disconnect();
    // console.log("🔌 MongoDB connection closed");
  } catch (err) {
    console.error("❌ Error during seed:", err);
    await mongoose.disconnect();
  }
}

seedDB();
