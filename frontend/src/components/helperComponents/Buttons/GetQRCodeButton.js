import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QRCode } from 'react-qrcode-logo'

const StyledButton = styled(Button)`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #7b00ff;
    color: #7b00ff;
    padding: 5px;
    &:hover {
        border: 2px solid #7b00ff;
        color: #FFFFFF;
        background: #7b00ff;
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

const GetQRCodeButton = props => {
    const { name, id } = props;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <StyledButton onClick={handleShow}> QR-Code abfragen </StyledButton>
            <Modal show={show} onHide={handleClose}>
                <StyledDiv>
                    <Modal.Header closeButton>
                        <Modal.Title>QR-Code für {name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div>
                                <QRCode value={id} />
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <StyledCancelButton onClick={handleClose}>
                            Schließen
                        </StyledCancelButton>
                    </Modal.Footer>
                </StyledDiv>
            </Modal>
        </>
    )
}

GetQRCodeButton.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    day: PropTypes.instanceOf(Date),
}

export default GetQRCodeButton;