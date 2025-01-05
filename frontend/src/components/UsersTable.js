import react from 'react';
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

    return (
        <>
            <h1>Usertable</h1>
            <StyledTable striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Essen</th>
                    </tr>
                </thead>
                <tbody>
                {testObject.map(user => (<TableRow user={user}/>))}
                </tbody>
            </StyledTable>
        </>
    )
}

UsersTable.propTypes = {
    users: PropTypes.array,
}

export default UsersTable;