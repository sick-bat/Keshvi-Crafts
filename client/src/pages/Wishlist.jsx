// client/src/pages/Wishlist.jsx

import React from "react";
import { useWishlist } from "../context/WishListContext";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="product-list">
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p style={{ textAlign: "center", fontStyle: "italic" }}>Your wishlist is empty.</p>
      ) : (
        <div className="product-grid">
          {wishlist.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
