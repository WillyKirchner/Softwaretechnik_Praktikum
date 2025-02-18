import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import UsersTable from "../components/UsersTable";
import UserManagement from "../components/UserManagement";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import {Button} from "react-bootstrap";
import { FaUserCircle } from 'react-icons/fa'; // Person icon
import Header from './Header'; // Import vom logo

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

const testObject = [
    { name: 'Willy Fritz', id: '0001' },
    { name: 'Max Moloch', id: '0002' },
    { name: 'Michelangelo', id: '0003' },
    { name: 'Caravaggio', id: '0004' },
    { name: 'Marx', id: '0005' },
    { name: 'Nietzsche', id: '0006' },
    { name: 'Dostojevsky', id: '0007' },
    { name: 'Beauvoir', id: '0008' },
    { name: 'Tolstoi', id: '0009' },
    { name: 'Homer', id: '0010' },
    { name: 'Adorno', id: '0011' },
    { name: 'Fromm', id: '0012' },
]

const ComponentContainer = styled.div`
    background-color: #c0cafa;
    border-radius: 5px;
    padding: 15px;
    max-height: 500px;
    overflow: hidden;
    width: 80%;
    margin: 1em auto 1em;
    max-width: 90em;
`

const Admin = props => {
    const { isLoggedIn } = props;

    const location = useLocation(); // To get state passed via React Router
    const navigate = useNavigate();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [users, setUsers] = useState([]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const username = location.state?.username || localStorage.getItem('username');

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

    const fetchUsers = () => {
        fetch('http://localhost:5000/person/')
            .then(response => response.json())
            .then(data => {
                console.log('Gefetchte Daten:', data);
                // Daten transformieren, um sie mit deinem bestehenden testObject-Format abzugleichen
                const transformedData = data.map(user => ({
                    name: user.name,
                    id: user.id.toString().padStart(4, '0') // ID vierstellig formatieren
                }));
                setUsers(transformedData);
            })
            .catch(error => console.error('Fehler beim Laden der Daten:', error));
    }

    //const { users } = props;
    useEffect(() => {
        // Daten von der API laden und in den State setzen
        fetchUsers();
    }, []);

    if (isLoggedIn) {
        return (
            <>
               <div>
                  <Header />

              </div>


                <AdminPageContainer>
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

                <ComponentContainer>
                    <UsersTable
                        title={'Bestellübersicht'}
                        description={'Wähle hier das Datum für welches du bestellen möchtest:'}
                        users={users}
                        addOrder={true}
                        editOrder={true}
                        deleteOrder={true}
                        reload={fetchUsers}
                        qrCode={true}
                    />
                </ComponentContainer>
                <ComponentContainer>
                    <UserManagement users={testObject}/>
                </ComponentContainer>
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
}

Admin.propTypes = {
    isLoggedIn: PropTypes.bool,
}

export default Admin;