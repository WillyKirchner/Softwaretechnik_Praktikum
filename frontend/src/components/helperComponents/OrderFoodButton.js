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
    margin: 0 1em;
    padding: 0.25em 1em;
    &:hover {
        border: 2px solid #BF4F74;
        color: #FFFFFF;
        background: #BF4F74;
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