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
    } = props;

    const [userList, setUserList] = useState([])

    const fetchUsers = () => {
        fetch('http://localhost:5000/person/')
            .then(response => response.json())
            .then(data => {
                console.log('Gefetchte Daten:', data);
                // Daten transformieren, um sie mit deinem bestehenden testObject-Format abzugleichen
                const transformedData = data.map(user => ({
                    name: user.name,
                    id: user.id.toString().padStart(4, '0') // ID vierstellig formatieren
                }));
                setUserList(transformedData);
            })
            .catch(error => console.error('Fehler beim Laden der Daten:', error));
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = (userId) => {
        console.log(userId);
        fetch(`http://localhost:5000/person/delete/?personID=${encodeURIComponent(userId)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                // Falls du einen Auth-Header oder Ähnliches brauchst, kannst du das hier ergänzen
                // 'Authorization': 'Bearer deinToken'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Fehler: ${response.status}`);
                }
                return response.json(); // Je nachdem, was deine API zurückgibt
            })
            .then(data => {
                // Erfolgreiche Antwort
                console.log('Delete erfolgreich:', data);
            })
            .catch(error => {
                console.error('Fehler bei der Delete-Anfrage:', error);
            });
        fetchUsers();
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