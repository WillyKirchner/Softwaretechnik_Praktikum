import React from 'react';
import styled from 'styled-components'; // Import styled-components
import { FaUtensils } from 'react-icons/fa'; 
import logo from '../frontend/public/borna.png'; 

// Styled components
const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8; /* Adjust the background color */
  border-bottom: 2px solid #ccc; /* Optional: a line under the header */
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px; /* Adjust the logo size */
  margin-right: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #333; /* Adjust text color */
`;

const FoodIcon = styled(FaUtensils)`
  margin-left: 5px; /* Adjust space between text and icon */
  color: #ff6347; /* Customize icon color */
`;

const Header = () => {
  return (
    <HeaderWrapper>
      {/* Logo on the left */}
      <LogoContainer>
        <Logo src={logo} alt="Company Logo" />
      </LogoContainer>

      {/* Mittagsessen text with food symbol */}
      <TitleContainer>
        <Title>
          Bestellübersicht <FoodIcon />
        </Title>
      </TitleContainer>
    </HeaderWrapper>
  );
};

export default Header;