import React from 'react';
import UsersTable from "../components/UsersTable";
import PropTypes from "prop-types";
import styled from "styled-components";

const ComponentContainer = styled.div`
    background-color: #c0cafa;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    max-height: 500px;
    overflow: hidden;
`

const Admin = props => {
    const { users } = props;

    return (
        <ComponentContainer>
            <UsersTable users={users} />
        </ComponentContainer>
    );
}

Admin.propTypes = {
    users: PropTypes.object,
}

export default Admin;