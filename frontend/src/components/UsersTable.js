import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableRow from "./helperComponents/TableRow";

const testObject = [
    { name: 'Willy Fritz', id: '0001' },
    { name: 'Max Moloch', id: '0002' },
    { name: 'Willy Fritz', id: '0003' },
]

const StyledTable = styled(Table)`
    background: transparent;
    margin: 0 1em;
    padding: 0.25em 1em;
`

const UsersTable = props => {
    const { users } = props;

    const handleDelete = (userId) => {
        alert(`Deleted User with ID: ${userId}`);
        // Implement actual deletion logic here (API call or state update)
    };

    return (
        <>
            <h1>User Table</h1>
            <StyledTable striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Actions</th> {/* New Actions Column */}
                </tr>
                </thead>
                <tbody>
                {testObject.map(user => (
                    <TableRow
                        key={user.id}
                        user={user}
                        onDelete={() => handleDelete(user.id)}  // Pass delete handler
                    />
                ))}
                </tbody>
            </StyledTable>
        </>
    )
}

UsersTable.propTypes = {
    users: PropTypes.array,
}

export default UsersTable;
