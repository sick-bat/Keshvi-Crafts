import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import homeIcon from '../assets/home.png';
import profileIcon from '../assets/profile.png';
import wishlistIcon from '../assets/wishlist.png';
import cartIcon from '../assets/cart.png';
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishListContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { totalItems, totalPrice } = useCart();
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="rounded-navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <span >Keshvi Crafts</span>
      </div>

      {/* Animated Hamburger Menu */}
      <div className="hamburger-container">
        <input 
          type="checkbox" 
          id="hamburger-checkbox" 
          className="hamburger-checkbox"
          checked={isMenuOpen}
          onChange={toggleMenu}
        />
        <label htmlFor="hamburger-checkbox" className="hamburger-label">
          <div className="hamburger-bar">
            <span className="top bar-line"></span>
            <span className="middle bar-line"></span>
            <span className="bottom bar-line"></span>
          </div>
        </label>
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
        <li>
          <Link to="/" title="Home" onClick={closeMenu}>
            <img src={homeIcon} alt="Home" />
          </Link>
        </li>
        <li>
          <Link to="/profile" title="Profile" onClick={closeMenu}>
            <img src={profileIcon} alt="Profile" />
          </Link>
        </li>
        <li className="icon-badge-container">
          <Link to="/wishlist" title="Wishlist" onClick={closeMenu}>
            <img src={wishlistIcon} alt="Wishlist" />
            {wishlistCount > 0 && (
              <span className="notif-badge">{wishlistCount}</span>
            )}
          </Link>
        </li>
        <li className="icon-badge-container">
          <Link to="/cart" title="Cart" onClick={closeMenu}>
            <img src={cartIcon} alt="Cart" />
            {totalItems > 0 && (
              <span className="notif-badge">{totalItems}</span>
            )}
            <span className="cart-amount">₹{totalPrice}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
