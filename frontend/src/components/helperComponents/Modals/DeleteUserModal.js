import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import styled from "styled-components";
import UsersTable from "../../UsersTable";

const StyledModalDiv = styled.div`
    background-color: #c0cafa;
    border-radius: 5px;
    border: none;
`

const StyledUserTable = styled(UsersTable)`
    height: 150px;
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

const DeleteUserModal = props => {
    const {
        showModal,
        setShowModalFalse,
        testObject,
    } = props;

    const [userList, setUserList] = useState(testObject)

    useEffect(() => {
        // TODO: RestAPI Get Userlist
    }, []);

    const handleDeleteUser = () => {
        // TODO: delete User via ID
    }

    return(

        <Modal show={showModal} onHide={setShowModalFalse}>
            <StyledModalDiv>
                <Modal.Header closeButton>
                    <Modal.Title>Nutzer Löschen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StyledUserTable
                        users={userList}
                        interactButton={'Löschen'}
                        interactButtonHandler={handleDeleteUser}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <StyledCancelButton onClick={setShowModalFalse}>
                        Schließen
                    </StyledCancelButton>
                </Modal.Footer>
            </StyledModalDiv>
        </Modal>

    )
}

DeleteUserModal.propTypes = {
    showModal: PropTypes.bool,
    setShowModalFalse: PropTypes.func,
    testObject: PropTypes.object,
}

export default DeleteUserModal;