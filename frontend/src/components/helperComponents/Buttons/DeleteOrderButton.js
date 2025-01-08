import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyledButton = styled(Button)`
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

const DeleteOrderButton = props => {
    const { id, day } = props;

    const isButtonActive = () => {
        let isActive = true;
        // change status based on request, which checks if there already is an order
        return isActive;
    }

    const deleteOrder = () => {
        // Rest anfrage mit id und Datum um essen zu löschen
    };

    return (
        <StyledButton disabled={!isButtonActive()} onClick={deleteOrder()}> Bestellung löschen </StyledButton>
    )
}

DeleteOrderButton.propTypes = {
    id: PropTypes.string,
    day: PropTypes.instanceOf(Date),
}

export default DeleteOrderButton;