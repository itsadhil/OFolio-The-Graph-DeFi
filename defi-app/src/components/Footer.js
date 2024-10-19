import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2024 oblockers. All Rights Reserved.</p>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #121212;
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 14px;
`;
