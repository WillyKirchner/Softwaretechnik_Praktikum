import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableRow from "./helperComponents/TableRow";

const StyledTable = styled(Table)`
    background: transparent;
    margin: 0 1em;
    padding: 0.25em 1em;
`;

const UsersTable = ({ users, handleDeleteUser }) => {
    return (
        <>
            <h1>User Table</h1>
            <StyledTable striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users && users.length > 0 ? (
                    users.map(user => (
                        <TableRow
                            key={user.id}
                            user={user}
                            onDelete={() => handleDeleteUser(user.id)}  // Pass delete handler
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" style={{ textAlign: 'center' }}>
                            Keine Benutzer gefunden
                        </td>
                    </tr>
                )}
                </tbody>
            </StyledTable>
        </>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array,
    handleDeleteUser: PropTypes.func,
};

export default UsersTable;
