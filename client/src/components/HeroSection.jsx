import React from 'react';
import './HeroSection.css'; // Optional: if you want separate styling
import Navbar from './Navbar';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-section">
                <Navbar />
      </div>
      <h2 className="hero-title">Handmade Crochet Gifts & Decor</h2>
      <p className="hero-subtitle">Every Loop, a Little Love Story 💛</p>
    </section>
  );
};

export default HeroSection;
