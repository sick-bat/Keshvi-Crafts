import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2025 Keshvi Crafts. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#eee7dc',
    color: '#3b2a20',
  },
};

export default Footer;
