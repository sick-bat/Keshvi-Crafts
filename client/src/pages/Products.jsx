import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Products.css'; 

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products", err));
  }, []);

  return (
    <div className="product-grid">
      {products.map(prod => (
        <ProductCard key={prod._id} product={prod} />
      ))}
    </div>
  );
};

export default Products;
