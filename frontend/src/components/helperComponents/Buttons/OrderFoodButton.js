import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Modal, Form } from 'react-bootstrap';
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
    &:disabled {
        border: 2px solid #5b9347;
        color: #5b9347;
    }
`

const StyledCancelButton = styled(Button)`
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
`

const StyledDiv = styled.div`
    background-color: #c0cafa;
    border-radius: 5px;
    border: none;
`

const OrderFoodButton = props => {
    const { name, id, day } = props;

    const [show, setShow] = useState(false);
    const [mainDish, setMainDish] = useState('');
    const [salad, setSalad] = useState(false);

    const handleSalad = () => {
        setSalad(!salad);
    }
    const handleBlueFood = () => {
        setMainDish('blue');
    }
    const handleRedFood = () => {
        setMainDish('red')
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isButtonActive = () => {
        let isActive = true;
        // TODO: change status based on request, which checks if there already is an order
        return isActive;
    }

    const handleSendOrder = () => {
        const order = { id: id, day: day, food: mainDish, salad: salad}
        // TODO: Rest anfrage mit order um essen zu bestellen
        setShow(false);
    }

    return (
        <>
            <StyledButton onClick={handleShow} disabled={!isButtonActive()}> Essen bestellen </StyledButton>
            <Modal show={show} onHide={handleClose}>
                <StyledDiv>
                    <Modal.Header closeButton>
                        <Modal.Title>Essen Bestellen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Du bestellst für {name} am {day.toLocaleDateString()}<br/>
                        Wähle das Essen und optional den Salat <br/><br/>
                        <Form>
                            <div>
                                <Form.Check // prettier-ignore
                                    inline
                                    type="radio"
                                    label="Rot"
                                    onClick={handleRedFood}
                                    name="group1"
                                />
                                <Form.Check // prettier-ignore
                                    inline
                                    type="radio"
                                    label="Blau"
                                    onClick={handleBlueFood}
                                    name="group1"
                                />
                            </div>
                            <Form.Check // prettier-ignore
                                type="checkbox"
                                label="Salat"
                                onClick={handleSalad}
                            />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <StyledCancelButton onClick={handleClose}>
                            Schließen
                        </StyledCancelButton>
                        <StyledButton onClick={handleSendOrder}>
                            Bestellung absenden
                        </StyledButton>
                    </Modal.Footer>
                </StyledDiv>
            </Modal>
        </>
    )
}

OrderFoodButton.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    day: PropTypes.instanceOf(Date),
}

export default OrderFoodButton;