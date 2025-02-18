import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Person icon
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import CustomDatePicker2 from "../components/helperComponents/CustomDatePicker2";
import Header from './Header'; // Import vom logo


// Dummy data for sites and orders
const dummyData = [
  {
    site: 'Zedtlitz',
    groups: [
      { groupName: 'Montage/Verpackung 4', orders: { red: 10, blue: 5, salad: 3 } },
      { groupName: 'Stanzanlage/Spritzgußmaschine', orders: { red: 5, blue: 1, salad: 5 } },
      { groupName: 'Küche/Hauswirtschaft', orders: { red: 12, blue: 0, salad: 1 } },
      { groupName: 'Autoaufbereitung', orders: { red: 1, blue: 4, salad: 2 } },
      { groupName: 'Montage/Verpackung 1', orders: { red: 5, blue: 8, salad: 1 } },
    ],
  },
  {
    site: 'W8',
    groups: [
      { groupName: 'Näherei', orders: { red: 5, blue: 10, salad: 2 } },
      { groupName: 'Wäscherei', orders: { red: 2, blue: 16, salad: 7 } },
      { groupName: 'Küche/Hauswirtschaft', orders: { red: 1, blue: 6, salad: 1 } },
      { groupName: 'Stanzanlage', orders: { red: 2, blue: 6, salad: 7 } },
      { groupName: 'Montag/Verpackung 7', orders: { red: 12, blue: 6, salad: 7 } },
    ],
  },
  {
    site: 'W13',
    groups: [
      { groupName: 'FBB 2 - Gruppe 4', orders: { red: 5, blue: 10, salad: 2 } },
      { groupName: 'FBB 2 - Gruppe 3', orders: { red: 6, blue: 4, salad: 2 } },
      { groupName: 'FBB 2 - Gruppe 2', orders: { red: 4, blue: 9, salad: 1 } },
      { groupName: 'FBB 2 - Gruppe 1', orders: { red: 7, blue: 10, salad: 2 } },
    ],
  },
];

//icon stuff
const AdminPageContainer = styled.div`
  position: fixed;
  top: 20px; /* Adjust this value to fine-tune vertical positioning */
  right: 20px; /* Positioning at the right side */
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Username = styled.span`
  margin-left: 8px;
  font-size: 16px;
`;

const DateLabel = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const DropdownArrow = styled.span`
  margin-left: 8px;
  font-size: 16px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 40px; /* Adjust this value for dropdown's vertical position */
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  width: 170px;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  

  &:hover {
    background-color: #f1f1f1;
  }

  &:last-child {
    border-top: 2px solid #ccc;
  }
`;

const LogOutItem = styled(DropdownItem)`
  color: red; /* Highlight the log out item with a different color */
  font-weight: bold;

  &:hover {
    background-color: #f9e7e7; /* A different hover effect for Log Out */
  }
`;
//icon stuff ende

// Styled components for the layout
const OverviewPageWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background-color: #f4f7fb;
  min-height: 100vh;
`;

const PageTitle = styled.h1`
  color: #2980b9;
  
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
`;

const SiteList = styled.div`
  margin-top: 20px;
`;

const Site = styled.div`
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #3498db;  /* Blue background */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
  }
`;

const SiteHeader = styled.div`
  cursor: pointer;
  padding: 20px;
  background-color: #2980b9;  /* Slightly darker blue */
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2471a3;  /* Slightly darker blue on hover */
  }
`;

const SiteSummary = styled.div`
  padding: 10px 20px;
  background-color: #d6eaf8;  /* Very light blue */
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: -1px;
  border-top: 1px solid #ddd;
  color: #2c3e50;  /* Black color for text */
`;

const SiteDetails = styled.div`
  padding: 20px;
  background-color: #ecf0f1;
`;

const Group = styled.div`
  margin-bottom: 15px;
`;

const GroupName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const GroupOrder = styled.p`
  margin: 5px 0;
  font-size: 1rem;
  color: #7f8c8d;
`;

const TotalOrder = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #27ae60;  /* Completely green */
  text-align: left;
`;

const Overview = props => {
  // State to manage which site is expanded
  const [expandedSite, setExpandedSite] = useState(null);
  const [date, setDate] = useState(new Date());

  // Function to calculate the total orders (red, blue, salad) for a site
  const calculateTotalOrders = (site) => {
    return site.groups.reduce(
      (totals, group) => {
        totals.red += group.orders.red;
        totals.blue += group.orders.blue;
        totals.salad += group.orders.salad;
        return totals;
      },
      { red: 0, blue: 0, salad: 0 }
    );
  };

  // Toggle expanded/collapsed state for a site
  const toggleSite = (site) => {
    setExpandedSite(expandedSite === site ? null : site);
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isLoggedIn } = props;
  const location = useLocation(); // To get state passed via React Router
  const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
  };
    
    const username = location.state?.username || localStorage.getItem('username');
    const navigate = useNavigate();

    const handleUnloggedTry = () => {
        navigate('/');
    }
    const handleLogOut = () => {
        // Handle the log out logic here (clear user session, etc.)
        localStorage.removeItem('username'); // Example: Remove the username session
        
        navigate('/');
    };
    
    const handleGoToAdmin = () => {
      navigate('/Admin'); // Navigate to the overview page
  };
  
  const handleGoToOverview = () => {
      navigate('/Overview'); // Navigate to the overview page
  };

    if (isLoggedIn) {
        return (
          <>
          <div>
            <Header />
                  
          </div>
          <><AdminPageContainer>
            {/* Username and Person Icon */}
            <UserInfo onClick={toggleDropdown}>
              <FaUserCircle size={30} />
              <Username>{username}</Username> {/* Replace with actual username */}
              <DropdownArrow>▼</DropdownArrow>
            </UserInfo>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <DropdownMenu>
                <DropdownItem onClick={handleGoToAdmin}>Bestellübersicht</DropdownItem>
                <DropdownItem onClick={handleGoToOverview}>Standortübersicht</DropdownItem>
                <LogOutItem onClick={handleLogOut}>Ausloggen</LogOutItem>
              </DropdownMenu>
            )}
          </AdminPageContainer>
          
                          
          <OverviewPageWrapper>
              
              <DateLabel>Datum auswählen:</DateLabel>
              <CustomDatePicker2 date={date} setDate={setDate}/>
              <PageTitle>Standorte</PageTitle>
              <SiteList>
                {dummyData.map((siteData, index) => {
                  const { red, blue, salad } = calculateTotalOrders(siteData);
                  return (
                    <Site key={index}>
                      <SiteHeader onClick={() => toggleSite(siteData.site)}>
                        {siteData.site}
                      </SiteHeader>

                      {/* Immediately visible total orders for each site */}
                      <SiteSummary>
                        Rot: {red}, Blau: {blue}, Salat: {salad}
                      </SiteSummary>

                      {expandedSite === siteData.site && (
                        <SiteDetails>
                          {siteData.groups.map((group, idx) => (
                            <Group key={idx}>
                              <GroupName>{group.groupName}</GroupName>
                              <GroupOrder style={{ color: 'red' }}>Rot: {group.orders.red}</GroupOrder>
                              <GroupOrder style={{ color: 'blue' }}>Blau: {group.orders.blue}</GroupOrder>
                              <GroupOrder>Salat: {group.orders.salad}</GroupOrder>
                            </Group>
                          ))}
                          <TotalOrder>
                            Bestellungen insgesamt - Rot: {red}, Blau: {blue}, Salat: {salad}
                          </TotalOrder>
                        </SiteDetails>
                      )}
                    </Site>
                  );
                })}
              </SiteList>
            </OverviewPageWrapper></>
            </>
        );
      }
    else {
        return(
            <>
                <h3>Du bist nicht eingeloggt</h3>
                <Button onClick={handleUnloggedTry}>zum Login</Button>
            </>
        )
    }    
};

Overview.propTypes = {
    users: PropTypes.object,
    isLoggedIn: PropTypes.bool,
}

export default Overview;
