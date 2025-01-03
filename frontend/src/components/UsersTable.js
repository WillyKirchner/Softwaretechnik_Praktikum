import react from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #BF4F74;
  color: #BF4F74;
  margin: 0 1em;
  padding: 0.25em 1em;
`

const UsersTable = props => {
    const { users } = props;

    return (
        <>
            <h1>Usertable</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Essen</th>
                </tr>
                <tr>
                    <th>Willy</th>
                    <th>willy@Email.com</th>
                    <th><Button> essen bestellen </Button></th>
                </tr>
            </table>
        </>
    )
}

UsersTable.propTypes = {
    users: PropTypes.object,
}

export default UsersTable;