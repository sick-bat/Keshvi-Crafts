import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BestSellerHighlight from './components/BestSellerHighlight';

import Products from './pages/Products';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist'; // ✅ optional: wishlist page

import { WishlistProvider } from './context/WishListContext'; // ✅ import WishlistProvider
import './App.css';

const App = () => {
  return (
    <WishlistProvider> {/* ✅ Context Provider */}
      <Router>
        <div>
          {/* <Navbar /> ✅ Now always visible */}
          <HeroSection />
          <BestSellerHighlight />

          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} /> {/* ✅ optional */}
          </Routes>

          <footer className="footer">
            <p>© 2025 Keshvi Crafts. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </WishlistProvider>
  );
};

export default App;
