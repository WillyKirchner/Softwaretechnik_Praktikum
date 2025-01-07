import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyledButton = styled(Button)`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #8a812f;
    color: #8a812f;
    padding: 5px;
    &:hover {
        border: 2px solid #8a812f;
        color: #FFFFFF;
        background: #8a812f;
    }
    &:active {
        border: 2px solid #8a812f;
        color: #FFFFFF;
        background: #8a812f;
    }
`

const OrderFoodButton = props => {
    const { id } = props;

    const sendOrder = () => {
        // Rest anfrage mit id um essen zu bestellen
    };

    return (
        <StyledButton> Bestellung bearbeiten </StyledButton>
    )
}

OrderFoodButton.propTypes = {
    id: PropTypes.string,
}

export default OrderFoodButton;