import React, {useState} from "react";
import {Button, Container, Modal, Table} from "react-bootstrap";
import PropTypes from "prop-types";
import UsersTable from "./UsersTable";

const UserManagement = (props) => {
    const { users } = props;

    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userList, setUserList] = useState(users);
    const [newUser, setNewUser] = useState({ name: '', id: '' });

    // Benutzer löschen
    // const handleDeleteUser = (userId) => {
    //     const updatedUsers = userList.filter(user => user.id !== userId);
    //     setUserList(updatedUsers);
    //     alert(`User with ID ${userId} deleted.`);
    // };

    // Eingabe für neuen Benutzer verwalten
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    // Neuen Benutzer hinzufügen
    const handleAddUser = () => {
        if (newUser.name && newUser.id) {
            setUserList([...userList, newUser]);
            setShowAddModal(false);
            alert(`User Added: ${newUser.name} (ID: ${newUser.id})`);
            setNewUser({ name: '', id: '' });
        } else {
            alert('Bitte füllen Sie alle Felder aus.');
        }
    };

    return (
        <>
            <h2 style={{ marginBottom: '30px' }}>Benutzer Aktionen</h2>

            {/* Füge Nutzer hinzu */}
            <Button
                variant="primary"
                onClick={() => setShowAddModal(true)}
                style={{
                    width: '80%',
                    padding: '20px',
                    fontSize: '22px',
                    backgroundColor: '#7b00ff',
                    border: 'none',
                    marginBottom: '20px'
                }}
            >
                Füge Nutzer hinzu
            </Button>

            {/* Nutzer Löschen */}
            <Button
                variant="danger"
                onClick={() => setShowDeleteModal(true)}
                style={{
                    width: '80%',
                    padding: '20px',
                    fontSize: '22px',
                    backgroundColor: '#7b00ff',
                    border: 'none',
                    marginBottom: '20px'
                }}
            >
                Nutzer Löschen
            </Button>


            {/* Add User Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Neuen Nutzer hinzufügen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={handleInputChange}
                        style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                    />
                    <input
                        type="text"
                        name="id"
                        placeholder="ID"
                        value={newUser.id}
                        onChange={handleInputChange}
                        style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Abbrechen
                    </Button>
                    <Button variant="success" onClick={handleAddUser}>
                        Nutzer hinzufügen
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete User Modal (Tabelle im Modal)  use handleDeleteUser to delete*/}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nutzer Löschen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UsersTable users={userList} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Schließen
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

UserManagement.propTypes = {
    users: PropTypes.array,
};

export default UserManagement;
