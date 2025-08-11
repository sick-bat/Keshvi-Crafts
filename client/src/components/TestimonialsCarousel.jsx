import React, { useState, useEffect, useRef } from 'react';
import './TestimonialsCarousel.css';

const testimonials = [
  {
    name: 'John Doe',
    rating: 5,
    message: 'Amazing quality and quick delivery. Loved the handmade details!',
    imageIndex: 5,
  },
  {
    name: 'Jane Smith',
    rating: 4,
    message: 'Highly recommend this store for unique handcrafted gifts!',
    imageIndex: 8,
  },
  {
    name: 'Ahmed Khan',
    rating: 5,
    message: 'Fantastic experience! Definitely ordering again.',
    imageIndex: 12,
  },
  {
    name: 'Maria Garcia',
    rating: 4,
    message: 'Beautiful and thoughtfully crafted. Great packaging too!',
    imageIndex: 14,
  },
  {
    name: 'Liam Wong',
    rating: 5,
    message: 'Customer support was excellent. Very satisfied.',
    imageIndex: 16,
  },
];

const starSVG = (
  <svg
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

function TestimonialsCarousel() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const trackRef = useRef(null);

  const cardsVisible = () => {
    const width = window.innerWidth;
    if (width < 480) return 1;
    else if (width < 768) return 2;
    return 3;
  };

  const updatePosition = (pos) => {
    const visible = cardsVisible();
    const maxPos = testimonials.length - visible;
    let newPos = pos;
    if (newPos < 0) newPos = maxPos;
    if (newPos > maxPos) newPos = 0;
    setCurrentPosition(newPos);
  };

  const handlePrev = () => {
    updatePosition(currentPosition - 1);
  };

  const handleNext = () => {
    updatePosition(currentPosition + 1);
  };

  useEffect(() => {
    const handleResize = () => updatePosition(currentPosition);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentPosition]);

  useEffect(() => {
    if (!trackRef.current) return;
    const visible = cardsVisible();
    const card = trackRef.current.querySelector('.testimonial-card');
    if (!card) return;

    const cardWidth = card.offsetWidth + 20;
    const translateX = -(currentPosition * cardWidth);
    trackRef.current.style.transform = `translateX(${translateX}px)`;
  }, [currentPosition]);

  return (
    <div className="testimonial-section">
      <h2 className="testimonial-title">What Our Customers Say</h2>
      <div className="testimonial-carousel">
        <button className="testimonial-nav left" onClick={handlePrev}>
          ‹
        </button>
        <div className="testimonial-viewport">
          <div className="testimonial-track" ref={trackRef}>
            {testimonials.map((t, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div
                    className="testimonial-image"
                    style={{
                      backgroundImage: `url('https://i.pravatar.cc/60?img=${t.imageIndex}')`,
                    }}
                  />
                  <div>
                    <div className="testimonial-stars">
                      {[...Array(t.rating)].map((_, i) => (
                        React.cloneElement(starSVG, { key: i })
                      ))}
                    </div>
                    <p className="testimonial-name">{t.name}</p>
                  </div>
                </div>
                <p className="testimonial-message">{t.message}</p>
              </div>
            ))}
          </div>
        </div>
        <button className="testimonial-nav right" onClick={handleNext}>
          ›
        </button>
      </div>
    </div>
  );
}

export default TestimonialsCarousel;
