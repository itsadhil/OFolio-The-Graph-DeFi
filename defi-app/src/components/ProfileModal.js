import React from 'react';
import styled from 'styled-components';
import OfolioLogo from './ofoliologo.png'; // Assuming this is the default PFP

const ProfileModal = ({ closeModal, walletAddress }) => {
  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <PFPContainer>
          <img src={OfolioLogo} alt="PFP" /> {/* Replace this with dynamic PFP */}
        </PFPContainer>
        <Title>Welcome!</Title>
        <Description>Wallet Address: {walletAddress}</Description>
        <GoToPortfolioButton onClick={() => alert('Redirecting to Portfolio...')}>
          Go to Portfolio
        </GoToPortfolioButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ProfileModal;

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

const PFPContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  img {
    width: 80px;
    border-radius: 50%; /* Make the PFP round */
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
`;

const GoToPortfolioButton = styled.button`
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
