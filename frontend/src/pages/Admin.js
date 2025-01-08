import React, { useState } from 'react';
import PropTypes from "prop-types";
import UsersTable from "../components/UsersTable";
import UserManagement from "../components/UserManagement";

// Testnutzer hinzufügen
const initialUsers = [
    { name: 'Max Mustermann', id: '0001' },
    { name: 'Erika Musterfrau', id: '0002' },
    { name: 'John Doe', id: '0003' }
];

const Admin = (props) => {
    const { users } = props

    const [userList, setUserList] = useState(initialUsers);

    return (
        <>
            <UsersTable users={userList}/>
            <UserManagement users={userList}/>
        </>
    );
};

Admin.propTypes = {
    users: PropTypes.array,
};

export default Admin;
