import React from 'react';
import PropTypes from 'prop-types';
import OrderFoodButton from "./Buttons/OrderFoodButton";
import EditOrderButton from "./Buttons/EditOrderButton";
import DeleteOrderButton from "./Buttons/DeleteOrderButton";
import GetQRCodeButton from "./Buttons/GetQRCodeButton";
import {Button} from "react-bootstrap";
import styled from "styled-components";

const StyledInteractButton = styled(Button)`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #BF4F74;
    color: #BF4F74;
    padding: 5px;
    &:hover {
        border: 2px solid #BF4F74;
        color: #FFFFFF;
        background: #BF4F74;
    }
    &:disabled {
        border: 2px solid #783e51;
        color: #783e51;
    }
`

const UsersTable = props => {
    const {
        user,
        day,
        addOrder,
        editOrder,
        deleteOrder,
        interact,
        interactHandler,
        qrCode,
    } = props;

    const interaction = () => {
        interactHandler(user.id);
    }

    return (
        <tr>
            <th>{user.name}</th>
            <th>{user.id}</th>
            {addOrder && <th><OrderFoodButton name={user.name} id={user.id} day={day}/></th>}
            {editOrder && <th><EditOrderButton id={user.id} day={day}/></th>}
            {deleteOrder && <th><DeleteOrderButton id={user.id} day={day}/></th>}
            {interact && <th><StyledInteractButton onClick={interaction}>{interact}</StyledInteractButton> </th>}
            {qrCode && <th><GetQRCodeButton name={user.name} id={user.id} /></th>}
        </tr>
    )
}

UsersTable.propTypes = {
    user: PropTypes.object,
    day: PropTypes.instanceOf(Date),
    addOrder: PropTypes.bool,
    editOrder: PropTypes.bool,
    deleteOrder: PropTypes.bool,
    interact: PropTypes.string,
    interactHandler: PropTypes.func,
    qrCode: PropTypes.bool,
}

export default UsersTable;