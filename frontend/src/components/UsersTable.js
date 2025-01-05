import react from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyledTable = styled(Table)`
    background: transparent;
    margin: 0 1em;
    padding: 0.25em 1em;
`

const StyledButton = styled(Button)`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #BF4F74;
    color: #BF4F74;
    margin: 0 1em;
    padding: 0.25em 1em;
    &:hover {
        border: 2px solid #BF4F74;
        color: #FFFFFF;
        background: #BF4F74;
    }
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
                    <tr>
                        <th>Willy</th>
                        <th>willy@Email.com</th>
                        <th><StyledButton> essen bestellen </StyledButton></th>
                    </tr>
                    <tr>
                        <th>Lukas</th>
                        <th>lukas@Email.com</th>
                        <th><StyledButton> essen bestellen </StyledButton></th>
                    </tr>
                </tbody>
            </StyledTable>
        </>
    )
}

UsersTable.propTypes = {
    users: PropTypes.object,
}

export default UsersTable;