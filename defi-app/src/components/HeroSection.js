import React from 'react';
import styled from 'styled-components';
import BackgroundVideo from './bgui.mp4'; // Assuming your video is in the assets folder

const HeroSection = ({ openModal }) => {
  return (
    <Hero>
      <VideoBackground autoPlay loop muted>
        <source src={BackgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <Overlay />
      <ContentWrapper>
        <Content>
          <Title>Revolutionize Your Portfolio With Our Service</Title>
          <Description>Manage Your Web3 Wallets in One Place.</Description>
          <VisitText>Visit our decentralized NFT store</VisitText> {/* Added text */}
          <ButtonContainer>
            <ConnectButton onClick={openModal}>Connect Wallet</ConnectButton>
            <VisitOpenBlockButton onClick={() => window.location.href = '/openblock'}>
              Visit OpenBlock
            </VisitOpenBlockButton>
          </ButtonContainer>
        </Content>
      </ContentWrapper>
    </Hero>
  );
};

export default HeroSection;

const Hero = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  color: white;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  filter: blur(5px);  
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  z-index: -1;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 100px 50px;
  height: 100%;
  z-index: 1;
`;

const Content = styled.div`
  max-width: 50%;  
`;

const Title = styled.h1`
  font-size: 58px;  
  font-weight: bold;
  margin-bottom: 20px; /* Reduced margin for better spacing */
`;

const Description = styled.p`
  font-size: 22px;  
  margin-bottom: 20px; /* Reduced margin for better spacing */
`;

const VisitText = styled.p`
  font-size: 18px; /* Adjust the size */
  margin-bottom: 15px; /* Margin between the text and buttons */
  color: white; /* Optional: change color to fit your theme */
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const ConnectButton = styled.button`
  background-color: white;
  color: #000;
  padding: 15px 30px;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #eaeaea;
  }
`;

const VisitOpenBlockButton = styled.button`
  background-color: #ffeb3b; /* Highlight color for visibility */
  color: #000;
  padding: 15px 30px;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fdd835;
  }
`;
