import React from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishListContext';
import './ProductCard.css';
import AddToCartButton from './AddToCartButton';


const ProductCard = ({ product }) => {
  const backendUrl = "http://localhost:5000";
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product._id);

  return (
    <div className="card">
      <div className="image-container">
        <img src={`${backendUrl}${product.imageUrl}`} alt={product.title} />

        {/* ❤️ Wishlist Icon */}
        <div
          className={`heart-container ${isWishlisted ? 'wishlisted' : ''}`}
          title="Like"
          onClick={() => toggleWishlist(product)}
        >
          <div className="svg-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="var(--heart-color)"
              className="svg-outline"
              style={{ width: 28, height: 28 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733
                  -.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765
                  3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="var(--heart-color)"
              className="svg-filled"
              style={{ width: 28, height: 28 }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.001 21.243c-.414 0-.83-.133-1.177-.4C5.001 16.478 2 12.718 2 8.75 
                2 6.127 4.083 4.001 6.75 4.001c1.704 0 3.252.988 4.001 2.453
                .749-1.465 2.297-2.453 4.001-2.453
                2.667 0 4.75 2.127 4.75 4.75
                0 3.968-3.001 7.728-8.824 12.093-.347.267-.763.4-1.177.4Z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="100"
              width="100"
              className="svg-celebrate"
              viewBox="0 0 100 100"
            >
              <polygon points="10,10 20,20"></polygon>
              <polygon points="10,50 20,50"></polygon>
              <polygon points="20,80 30,70"></polygon>
              <polygon points="90,10 80,20"></polygon>
              <polygon points="90,50 80,50"></polygon>
              <polygon points="80,80 70,70"></polygon>
            </svg>
          </div>
        </div>
      </div>

      <div className="card-content">
        <h3>{product.title}</h3>
        <p className="category">{product.category}</p>
        <p className="price">₹{product.price}</p>
        {/* <button onClick={() => addToCart(product)} className="add-button">
          Add to Cart
        </button> */}
<AddToCartButton
  count={0}
  onAdd={(qty) => addToCart({ ...product, quantity: qty })}
  onRemove={(qty) => console.log('Removed from cart:', qty)}
/>


      </div>
    </div>
  );
};

export default ProductCard;
