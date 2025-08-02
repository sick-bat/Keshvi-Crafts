import React from 'react';
import bestSellerImage from '../assets/BestSeller.png';
import './BestSellerHighlight.css';
import { useCart } from '../context/CartContext';

const BestSellerHighlight = () => {
  const { addToCart } = useCart();

  // 👇 Replace with actual backend product data for "Crochet Sunflower Pot"
  const product = {
    _id: "687c82f9e1bdf8e87dd38e55", // Must match backend
    title: "Crochet Sunflower Pot",
    price: 249,
    category: "Home Decor",
    imageUrl: "/custom-no-bg.png", // not used in cart; visual only
  };

  return (
    <div className="outer-box">
      <div className="relative-wrapper">
        <div className="inner-box">
          <h2 className="dancing-script">Our best selling<br />product</h2>
          <p className="dancing-script">
            Once, there was a little sunflower who always turned her face toward the light, even on cloudiest days.
            Each morning, she reminded the whole garden: ‘Hope always finds a way to bloom.’ Now, she brings that same golden cheer straight to your home.
          </p>
          <button
            className="btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
        <img src={bestSellerImage} className="product-image" alt="product" />
      </div>
    </div>
  );
};

export default BestSellerHighlight;
