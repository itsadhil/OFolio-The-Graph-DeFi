import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import styled from 'styled-components';
import { ethers } from 'ethers'; // Use ethers.js

import OfolioLogo from './ofoliologo.png'; // Assuming the logo is in assets folder
import PFPPlaceholder from './ofoliologo.png'; // Placeholder for users without ENS PFP

const ConnectWalletModal = ({ closeModal }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [ensAvatar, setEnsAvatar] = useState(null); // State for ENS avatar
  const [showProfileModal, setShowProfileModal] = useState(false);  // Track when to show the profile modal
  const navigate = useNavigate(); // React Router navigation hook

  // MetaMask connection handler
  const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access if needed
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });

            // Check if the account was returned
            if (accounts.length > 0) {
                setWalletAddress(accounts[0]);
                await fetchEnsData(accounts[0]); // Fetch ENS avatar
                setShowProfileModal(true); // Show the profile modal
            } else {
                alert('No accounts found. Please ensure you are logged into MetaMask.');
            }
        } catch (error) {
            console.error('MetaMask connection failed:', error);
            alert('Connection to MetaMask failed. Please try again.');
        }
    } else {
        alert('MetaMask is not installed or not detected in this browser. Please install MetaMask and try again.');
    }
};


  // Fetch ENS Avatar and Name
  const fetchEnsData = async (address) => {
    const provider = new ethers.BrowserProvider(window.ethereum); // Updated to BrowserProvider for ethers.js v6
    const ensName = await provider.lookupAddress(address); // Look up ENS name

    if (ensName) {
      const avatar = await provider.getAvatar(ensName); // Fetch ENS avatar
      if (avatar) {
        setEnsAvatar(avatar);
      }
    }
  };

  const goToPortfolio = () => {
    navigate('/portfolio'); // Navigate to portfolio page
  };

  return (
    <>
      {!showProfileModal ? (
        <ModalOverlay onClick={closeModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <LogoContainer>
              <img src={OfolioLogo} alt="Ofolio Logo" />
            </LogoContainer>
            <Title>Connect Your Wallet</Title>
            <Description>Connect with MetaMask to get started</Description>
            <ConnectButton onClick={connectMetaMask}>
              Connect with MetaMask
            </ConnectButton>
          </ModalContainer>
        </ModalOverlay>
      ) : (
        <ProfileModalOverlay onClick={closeModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <LogoContainer>
              <img src={ensAvatar || PFPPlaceholder} alt="Profile Picture" /> {/* Show ENS avatar or fallback to placeholder */}
            </LogoContainer>
            <Title>Welcome!</Title>
            <Description>Your Wallet Address</Description>
            <WalletAddress>{walletAddress}</WalletAddress>
            <PortfolioButton onClick={goToPortfolio}>
              Go to Portfolio
            </PortfolioButton>
          </ModalContainer>
        </ProfileModalOverlay>
      )}
    </>
  );
};

export default ConnectWalletModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Translucent black background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ProfileModalOverlay = styled(ModalOverlay)``;  // Same style for background

const ModalContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  width: 400px;
  text-align: center;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  img {
    width: 80px;
    border-radius: 50%;  /* For PFP, make it round */
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const WalletAddress = styled.p`
  font-size: 14px;
  word-break: break-word;
  margin-bottom: 30px;
  color: #ffeb3b;  /* Highlight the address */
`;

const ConnectButton = styled.button`
  background-color: #1e90ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005fcc;
  }
`;

const PortfolioButton = styled.button`
  background-color: #1e90ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005fcc;
  }
`;
