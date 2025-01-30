import React, { useState } from 'react';
import styled from 'styled-components';

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

// Styled components for the layout
const OverviewPageWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background-color: #f4f7fb;
  min-height: 100vh;
`;

const PageTitle = styled.h1`
  color: #34495e;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 30px;
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
  text-align: center;
`;

const Overview = () => {
  // State to manage which site is expanded
  const [expandedSite, setExpandedSite] = useState(null);

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

  return (
    <OverviewPageWrapper>
      <PageTitle>Standortübersicht</PageTitle>
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
                Red: {red}, Blue: {blue}, Salad: {salad}
              </SiteSummary>

              {expandedSite === siteData.site && (
                <SiteDetails>
                  {siteData.groups.map((group, idx) => (
                    <Group key={idx}>
                      <GroupName>{group.groupName}</GroupName>
                      <GroupOrder style={{ color: 'red' }}>Red: {group.orders.red}</GroupOrder>
                      <GroupOrder style={{ color: 'blue' }}>Blue: {group.orders.blue}</GroupOrder>
                      <GroupOrder>Salad: {group.orders.salad}</GroupOrder>
                    </Group>
                  ))}
                  <TotalOrder>
                    Total Orders - Red: {red}, Blue: {blue}, Salad: {salad}
                  </TotalOrder>
                </SiteDetails>
              )}
            </Site>
          );
        })}
      </SiteList>
    </OverviewPageWrapper>
  );
};

export default Overview;
