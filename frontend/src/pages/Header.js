import React from 'react';
import styled from 'styled-components'; // Import styled-components
import { FaUtensils } from 'react-icons/fa'; 
import logo from '../components/helperComponents/logo/borna.png'; 

// Styled components
const HeaderWrapper = styled.header`
  position: relative;
  width: 100%;
  padding: 20px;
  background-color: #f8f8f8;
  border-bottom: 2px solid #ccc;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px; /* Adjust space if needed */
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const FoodIcon = styled(FaUtensils)`
  margin-left: 5px;
  color: #ff6347;
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
          Mittagsversorgung <FoodIcon />
        </Title>
      </TitleContainer>
    </HeaderWrapper>
  );
};

export default Header;