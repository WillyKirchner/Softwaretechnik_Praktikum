import React from 'react';
import UsersTable from "../components/UsersTable";
import PropTypes from "prop-types";
import styled from "styled-components";

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
    const { users } = props;

    return (
        <>
            <h1>Admin Seite - hier vllt. Header?</h1>
            <ComponentContainer>
                <UsersTable
                    title={'Bestellübersicht'}
                    description={'Wähle hier das Datum für welches du bestellen möchtest:'}
                    users={users}
                    addOrder={true}
                    editOrder={true}
                    deleteOrder={true}
                />
            </ComponentContainer>
        </>
    );
}

Admin.propTypes = {
    users: PropTypes.object,
}

export default Admin;