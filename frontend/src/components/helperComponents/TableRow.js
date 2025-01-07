import React from 'react';
import PropTypes from 'prop-types';
import OrderFoodButton from "./OrderFoodButton";

const UsersTable = props => {
    const { user, day } = props;

    return (
        <tr>
            <th>{user.name}</th>
            <th>{user.id}</th>
            <th><OrderFoodButton id={user.id} day={day}/></th>
            <th>WIP</th>
            <th>WIP</th>
        </tr>
    )
}

UsersTable.propTypes = {
    user: PropTypes.object,
    day: PropTypes.instanceOf(Date),
}

export default UsersTable;