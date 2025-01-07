import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyledButton = styled(Button)`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #418a2f;
    color: #418a2f;
    padding: 5px;
    &:hover {
        border: 2px solid #418a2f;
        color: #FFFFFF;
        background: #418a2f;
    }
    &:active {
        border: 2px solid #418a2f;
        color: #FFFFFF;
        background: #418a2f;
    }
`

const OrderFoodButton = props => {
    const { id } = props;

    const sendOrder = () => {
        // Rest anfrage mit id um essen zu bestellen
    };

    return (
        <StyledButton> Essen bestellen </StyledButton>
    )
}

OrderFoodButton.propTypes = {
    id: PropTypes.string,
}

export default OrderFoodButton;