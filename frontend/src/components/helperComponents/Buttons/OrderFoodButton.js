import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
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
`

const OrderFoodButton = props => {
    const { id, day } = props;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const sendOrder = () => {
        // Rest anfrage mit id um essen zu bestellen
    };

    return (
        <>
            <StyledButton onClick={handleShow}> Essen bestellen </StyledButton>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

OrderFoodButton.propTypes = {
    id: PropTypes.string,
    day: PropTypes.instanceOf(Date),
}

export default OrderFoodButton;