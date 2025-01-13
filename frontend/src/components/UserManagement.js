import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import UsersTable from "./UsersTable";
import styled from "styled-components";
import AddUserModal from "./helperComponents/Modals/AddUserModal";
import DeleteUserModal from "./helperComponents/Modals/DeleteUserModal";

const StyledButton = styled(Button)`
    width: 30%;
    margin-top: 5px;
    margin-bottom: 5px;
    background: #FFFFFF;
    border-radius: 3px;
    border: none;
    color: #7b00ff;
    padding: 5px;

    &:hover {
        color: #FFFFFF;
        background: #7b00ff;
    }
`

const StyledInput = styled.input`
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
    margin-top: 5px;
    border: none;
    border-radius: 5px;
`

const StyledModalDiv = styled.div`
    background-color: #c0cafa;
    border-radius: 5px;
    border: none;
`

const StyledUserTable = styled(UsersTable)`
    height: 150px;
`

const UserManagement = (props) => {
    const {users} = props;

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Benutzer löschen
    // const handleDeleteUser = (userId) => {
    //     const updatedUsers = userList.filter(user => user.id !== userId);
    //     setUserList(updatedUsers);
    //     alert(`User with ID ${userId} deleted.`);
    // };

    const handleSetAddModalFalse = () => {
        setShowAddModal(false);
    }

    const handleSetDeleteModalFalse = () => {
        setShowDeleteModal(false)
    }

    return (
        <>
            <h2>Benutzerverwaltung</h2>

            <StyledButton
                onClick={() => setShowAddModal(true)}
            >
                Nutzer hinzufügen
            </StyledButton>
            <br/>
            <StyledButton
                onClick={() => setShowEditModal(true)}
            >
                Nutzer Bearbeiten
            </StyledButton>
            <br/>
            <StyledButton
                onClick={() => setShowDeleteModal(true)}
            >
                Nutzer Löschen
            </StyledButton>

            <AddUserModal showModal={showAddModal} setShowModalFalse={handleSetAddModalFalse} testObject={users}/>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nutzer Löschen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StyledUserTable users={users}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowEditModal(false)}>
                        Schließen
                    </Button>
                </Modal.Footer>
            </Modal>

            <DeleteUserModal showModal={showDeleteModal} setShowModalFalse={handleSetDeleteModalFalse} testObject={users}/>
        </>
    );
};

UserManagement.propTypes = {
    users: PropTypes.object,
};

export default UserManagement;
