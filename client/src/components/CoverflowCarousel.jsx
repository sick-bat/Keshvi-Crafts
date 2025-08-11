import React, { useState, useEffect, useRef } from 'react';
import './CoverflowCarousel.css';
import ProductModal from './ProductModal';

const products = [
 {
    _id: 'plant006',
    title: 'Mini Succulent Plant',
    category: 'Plants',
    price: 399,
    originalPrice: 499,
    imageUrl: 'https://picsum.photos/300/300?random=1',
    photos: ['https://picsum.photos/300/300?random=1', 'https://picsum.photos/300/300?random=4']
  },
  {
    _id: 'plant006',
    title: 'Mini Succulent Plant',
    category: 'Plants',
    price: 399,
    originalPrice: 499,
    imageUrl: 'https://picsum.photos/300/300?random=2',
    photos: ['https://picsum.photos/300/300?random=2', 'https://picsum.photos/300/300?random=4']
  },
  {
    _id: 'candle003',
    title: 'Scented Soy Candle',
    category: 'Home Decor',
    price: 350,
    originalPrice: 450,
    imageUrl: 'https://picsum.photos/300/300?random=3',
    photos: ['https://picsum.photos/300/300?random=3', 'https://picsum.photos/300/300?random=4']
  },
  {
    _id: 'plant006',
    title: 'Mini Succulent Plant',
    category: 'Plants',
    price: 399,
    originalPrice: 499,
    imageUrl: 'https://picsum.photos/300/300?random=5',
    photos: ['https://picsum.photos/300/300?random=5', 'https://picsum.photos/300/300?random=4']
  },
  {
    _id: 'plant006',
    title: 'Mini Succulent Plant',
    category: 'Plants',
    price: 399,
    originalPrice: 499,
    imageUrl: 'https://picsum.photos/300/300?random=6',
    photos: ['https://picsum.photos/300/300?random=6', 'https://picsum.photos/300/300?random=4']
  },
  {
    _id: 'plant006',
    title: 'Mini Succulent Plant',
    category: 'Plants',
    price: 399,
    originalPrice: 499,
    imageUrl: 'https://picsum.photos/300/300?random=9',
    photos: ['https://picsum.photos/300/300?random=8', 'https://picsum.photos/300/300?random=4']
  }
];

const CoverflowCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(products.length / 2));
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const itemsRef = useRef([]);

  // Touch/swipe variables
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const isDragging = useRef(false);

  const goToPrev = () => {
    if (isAnimating) return;
    setCurrentIndex(prev => prev > 0 ? prev - 1 : products.length - 1);
    updatePositions();
  };

  const goToNext = () => {
    if (isAnimating) return;
    setCurrentIndex(prev => prev < products.length - 1 ? prev + 1 : 0);
    updatePositions();
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setCurrentIndex(index);
    updatePositions();
  };

  const updatePositions = () => {
    setIsAnimating(true);
    
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      
      // Clear all position classes
      item.classList.remove('active', 'left-1', 'left-2', 'left-3', 'right-1', 'right-2', 'right-3');
      
      const position = index - currentIndex;
      
      if (position === 0) {
        item.classList.add('active');
      } else if (position === -1) {
        item.classList.add('left-1');
      } else if (position === -2) {
        item.classList.add('left-2');
      } else if (position <= -3) {
        item.classList.add('left-3');
      } else if (position === 1) {
        item.classList.add('right-1');
      } else if (position === 2) {
        item.classList.add('right-2');
      } else if (position >= 3) {
        item.classList.add('right-3');
      }
    });
    
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleItemClick = (product, index) => {
    if (currentIndex === index) {
      setSelectedProduct(product);
    } else {
      goToSlide(index);
    }
  };

  // Touch events
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    touchCurrentX.current = e.touches[0].clientX;
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    
    const diffX = touchStartX.current - touchCurrentX.current;
    const threshold = 50;
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    
    isDragging.current = false;
  };

  // Keyboard navigation
  const handleKeydown = (e) => {
    switch(e.keyCode) {
      case 37: // Left arrow
        goToPrev();
        break;
      case 39: // Right arrow
        goToNext();
        break;
      default:
        break;
    }
  };

  // Mouse wheel navigation
  const handleWheel = (e) => {
    if (isAnimating) return;
    
    e.preventDefault();
    
    if (e.deltaY > 0) {
      goToNext();
    } else {
      goToPrev();
    }
  };

  // Set up event listeners
  useEffect(() => {
    const stage = stageRef.current;
    
    if (stage) {
      // Touch events
      stage.addEventListener('touchstart', handleTouchStart, { passive: false });
      stage.addEventListener('touchmove', handleTouchMove, { passive: false });
      stage.addEventListener('touchend', handleTouchEnd, { passive: false });
      
      // Mouse wheel
      stage.addEventListener('wheel', handleWheel, { passive: false });
    }

    // Keyboard events
    document.addEventListener('keydown', handleKeydown);

    return () => {
      if (stage) {
        stage.removeEventListener('touchstart', handleTouchStart);
        stage.removeEventListener('touchmove', handleTouchMove);
        stage.removeEventListener('touchend', handleTouchEnd);
        stage.removeEventListener('wheel', handleWheel);
      }
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [isAnimating, currentIndex]);

  // Update positions when currentIndex changes
  useEffect(() => {
    updatePositions();
  }, [currentIndex]);

  return (
    <div className="container" ref={containerRef}>
      <h1>Best of our customized hooks</h1>
      <div className="coverflow-slider">
        <div className="coverflow-stage" ref={stageRef}>
          {products.map((product, index) => (
            <div
              key={product._id}
              ref={el => itemsRef.current[index] = el}
              className="coverflow-item"
              onClick={() => handleItemClick(product, index)}
            >
              <img src={product.imageUrl} alt={product.title} />
              <div className="coverflow-text">{product.title}</div>
            </div>
          ))}
        </div>
        
        <div className="coverflow-navigation">
          <button className="nav-button prev-button" onClick={goToPrev}>‹</button>
          <button className="nav-button next-button" onClick={goToNext}>›</button>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default CoverflowCarousel;
