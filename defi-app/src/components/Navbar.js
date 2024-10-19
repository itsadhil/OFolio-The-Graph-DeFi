import React from 'react';
import styled from 'styled-components';
import OfolioLogo from './ofoliologo.png'; // Assuming the logo is in assets folder

const Navbar = ({ openModal }) => {
  return (
    <Nav>
      <LogoContainer>
        <img src={OfolioLogo} alt="Ofolio Logo" />
        <LogoText>Ofolio</LogoText>
      </LogoContainer>
      <NavLinks>
        <a href="/">Home</a>
        <a href="/technology">Technology</a>
        <a href="/features">Features</a>
      </NavLinks>
      <ConnectWalletButton onClick={openModal}>Connect Wallet</ConnectWalletButton>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: absolute;
  top: 20px;  /* Added spacing from top */
  left: 50%;
  transform: translateX(-50%);  /* Center the navbar */
  width: 95%;  /* Ensure the width is within bounds */
  background: rgba(255, 255, 255, 0.2); /* Mirror-like transparent effect */
  backdrop-filter: blur(10px);  /* Adds blur */
  border-radius: 20px;  /* Rounded corners */
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 100;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    margin-right: 10px;
  }
`;

const LogoText = styled.h1`
  font-size: 24px;
  color: white;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    transition: color 0.3s;

    &:hover {
      color: #ffeb3b;
    }
  }
`;

const ConnectWalletButton = styled.button`
  background-color: transparent;
  border: 1px solid #ffffff;
  padding: 8px 16px;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  max-width: fit-content;  /* Ensures the button fits its content and doesn't overflow */

  &:hover {
    background-color: #1e90ff;
  }
`;
