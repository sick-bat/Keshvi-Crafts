import React, { useState } from 'react';
import './AddToCartButton.css';

const AddToCartButton = ({ count = 0, onAdd, onRemove }) => {
  const [qty, setQty] = useState(count);

  if (qty === 0) {
    return (
      <button className="addtocart-btn" onClick={() => { setQty(1); onAdd(1); }}>
        <span className="cart-icon">
          🛒
        </span>
        <span className="cart-text">Add to Cart</span>
      </button>
    );
  }

  return (
    <div className="counter-container">
      <button className="counter-btn" onClick={() => {
        if (qty === 1) {
          setQty(0);
          onRemove(0);
        } else {
          setQty(qty - 1);
          onAdd(qty - 1);
        }
      }}>
        −
      </button>
      <div className="counter-value">{qty}</div>
      <button className="counter-btn" onClick={() => {
        setQty(qty + 1);
        onAdd(qty + 1);
      }}>
        +
      </button>
    </div>
  );
};

export default AddToCartButton;
