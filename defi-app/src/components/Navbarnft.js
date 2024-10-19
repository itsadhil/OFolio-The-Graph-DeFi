import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/opensea-logo.png" alt="OpenSea Logo" className="app-logo" />
        <h1>MyNFT Marketplace</h1>
      </div>
      <input type="text" placeholder="Search NFTs" className="search-bar" />
    </nav>
  );
};

export default Navbar;
