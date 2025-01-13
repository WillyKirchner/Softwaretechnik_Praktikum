import React from 'react';
import UsersTable from "../components/UsersTable";
import UserManagement from "../components/UserManagement";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import {Button} from "react-bootstrap";

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
    const { users, isLoggedIn } = props;

    const navigate = useNavigate();

    const handleUnloggedTry = () => {
        navigate('/');
    }

    if (isLoggedIn) {
        return (
            <>
                <h1>Admin Seite - hier vllt. Header?</h1>
                <ComponentContainer>
                    <UsersTable
                        title={'Bestellübersicht'}
                        description={'Wähle hier das Datum für welches du bestellen möchtest:'}
                        users={testObject}
                        addOrder={true}
                        editOrder={true}
                        deleteOrder={true}
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
    users: PropTypes.object,
    isLoggedIn: PropTypes.bool,
}

export default Admin;