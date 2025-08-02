import React, { useState } from 'react';
import './AddToCartButton.css';

const AddToCartButton = ({ onAdd, onRemove, count = 0 }) => {
  const [qty, setQty] = useState(count);

  // Start with 'Add Item', then show counter when clicked
  const [active, setActive] = useState(qty > 0);

  const handleAddClick = () => {
    setActive(true);
    if (qty === 0) {
      setQty(1);
      onAdd(1);
    }
  };

  const increment = () => {
    setQty(qty + 1);
    onAdd(qty + 1);
  };

  const decrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
      onAdd(qty - 1);
    } else {
      setQty(0);
      setActive(false);
      onRemove(0);
    }
  };

  return active ? (
    <div className="counter-container">
      <button className="counter-btn" onClick={decrement} aria-label="Decrease">
        &#8722;
      </button>
      <div className="counter-value">{qty}</div>
      <button className="counter-btn" onClick={increment} aria-label="Increase">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="#fff" height="22" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg>
      </button>
    </div>
  ) : (
    <button type="button" className="button" onClick={handleAddClick}>
      <span className="button__text">Add Item</span>
      <span className="button__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg>
      </span>
    </button>
  );
};

export default AddToCartButton;
