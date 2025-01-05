import react from 'react';
import PropTypes from 'prop-types';
import OrderFoodButton from "./OrderFoodButton";

const UsersTable = props => {
    const { user } = props;

    return (
        <tr>
            <th>{user.name}</th>
            <th>{user.id}</th>
            <th><OrderFoodButton id={user.id}/></th>
        </tr>
    )
}

UsersTable.propTypes = {
    user: PropTypes.object,
}

export default UsersTable;