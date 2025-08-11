import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './ProductModal.css';
import ProductCard from './ProductCard';

const ProductModal = ({ product, onClose }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Handle backdrop click to close modal
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('product-modal-overlay')) {
      onClose();
    }
  };

  // Create portal to render modal outside of component hierarchy
  const modalContent = (
    <div 
      className="product-modal-overlay" 
      onClick={handleBackdropClick}
    >
      <div className="product-modal-content">
        <button 
          className="product-modal-close" 
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="product-modal-inner">
          <ProductCard product={product} />
        </div>
      </div>
    </div>
  );

  // Render modal using React Portal to ensure it appears above everything
  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

export default ProductModal;
