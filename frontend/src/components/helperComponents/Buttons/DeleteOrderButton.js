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
    &:active {
        border: 2px solid #6b2c41;
        color: #FFFFFF;
        background: #6b2c41;
    }
`

const OrderFoodButton = props => {
    const { id } = props;

    const sendOrder = () => {
        // Rest anfrage mit id um essen zu bestellen
    };

    return (
        <StyledButton> Bestellung löschen </StyledButton>
    )
}

OrderFoodButton.propTypes = {
    id: PropTypes.string,
}

export default OrderFoodButton;