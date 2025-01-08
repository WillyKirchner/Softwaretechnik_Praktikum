import React from 'react';
import PropTypes from 'prop-types';
import OrderFoodButton from "./Buttons/OrderFoodButton";
import EditOrderButton from "./Buttons/EditOrderButton";
import DeleteOrderButton from "./Buttons/DeleteOrderButton";

const UsersTable = props => {
    const { user, day, addOrder, editOrder, deleteOrder } = props;

    return (
        <tr>
            <th>{user.name}</th>
            <th>{user.id}</th>
            {addOrder && <th><OrderFoodButton name={user.name} id={user.id} day={day}/></th>}
            {editOrder && <th><EditOrderButton id={user.id} day={day}/></th>}
            {deleteOrder && <th><DeleteOrderButton id={user.id} day={day}/></th>}
        </tr>
    )
}

UsersTable.propTypes = {
    user: PropTypes.object,
    day: PropTypes.instanceOf(Date),
    addOrder: PropTypes.bool,
    editOrder: PropTypes.bool,
    deleteOrder: PropTypes.bool,
}

export default UsersTable;