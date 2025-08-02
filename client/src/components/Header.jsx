import React from 'react';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header style={styles.header}>
      <img src={logo} alt="Keshvi Crafts" style={styles.logo} />
      <h1 style={styles.title}>Keshvi Crafts</h1>
    </header>
  );
}

const styles = {
  header: {
    background: '#fff',
    padding: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: '60px',
    marginRight: '1rem',
  },
  title: {
    fontSize: '2rem',
    color: '#5b3c2d',
  },
};

export default Header;
