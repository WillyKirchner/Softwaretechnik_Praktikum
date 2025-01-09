import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import styled from "styled-components";
import UsersTable from "../../UsersTable";

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

const AddUserModal = props => {
    const {
        showModal,
        setShowModalFalse,
        testObject,
    } = props;

    const [privilegeOn, setPrivilegeOn] = useState(true)
    // const [userList, setUserList] = useState(testobject)
    const [newUser, setNewUser] = useState({name: '', password: '', privilegeLevel: 0, leadOver: []});

    useEffect(() => {
        // TODO: RestAPI Get Userlist
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewUser({...newUser, [name]: value});
    };

    const handleAddUser = () => {
        if (newUser.name && newUser.password && newUser.privilegeLevel > -1) {
            // TODO: RestAPI add user
            // setUserList([...userList, newUser]);
            setShowModalFalse();
            alert(`User Added: ${newUser.name} (Password: ${newUser.password}, PrivilegeLevel: ${newUser.privilegeLevel}, LeadOver: )`);
            setNewUser({name: '', password: '', privilegeLevel: 0, leadOver: []});
        } else {
            alert('Bitte fülle alle Felder aus.');
        }
    };

    const handleAddNormalUser = () => {
        if (newUser.name) {
            // TODO: RestAPI add normal user, cut off all except name
            // setUserList([...userList, newUser]);
            setShowModalFalse();
            alert(`User Added: ${newUser.name} `);
            setNewUser({name: '', password: '', privilegeLevel: 0, leadOver: []});
        } else {
            alert('Bitte fülle das Feld aus.');
        }
    };

    const handlePrivilegeLevelOn = () => {
        setPrivilegeOn(!privilegeOn);
    }


    const handlePrivilegeLevelThree = () => {
        setNewUser({...newUser, privilegeLevel: 3})
    }

    const handlePrivilegeLevelTwo = () => {
        setNewUser({...newUser, privilegeLevel: 2})
    }

    const handlePrivilegeLevelOne = () => {
        setNewUser({...newUser, privilegeLevel: 1})
    }

    const handlePrivilegeLevelZero = () => {
        setNewUser({...newUser, privilegeLevel: 0})
    }

    const handleAddManagedUser = () => {
        // TODO: get id from table and add it to leadOver array
    }

    return(
        <Modal show={showModal} onHide={setShowModalFalse} >
            <StyledModalDiv>
                <Modal.Header closeButton>
                    <Modal.Title>Neuen Nutzer hinzufügen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Check // prettier-ignore
                            inline
                            type="radio"
                            label="Verwaltender Nutzer"
                            onClick={handlePrivilegeLevelOn}
                            name="group1"
                            checked={privilegeOn}
                        />
                        <Form.Check // prettier-ignore
                            inline
                            type="radio"
                            label="normaler Nutzer"
                            onClick={handlePrivilegeLevelOn}
                            checked={!privilegeOn}
                            name="group1"
                        />
                    </Form>
                    <StyledInput
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={handleInputChange}
                    />
                    {privilegeOn &&
                        <>
                            <StyledInput
                                type="password"
                                name="password"
                                placeholder="Passwort"
                                value={newUser.password}
                                onChange={handleInputChange}
                            />
                            Art des Verwaltenden Nutzers
                            <Form>
                                <Form.Check // prettier-ignore
                                    inline
                                    type="radio"
                                    label="Administration"
                                    onClick={handlePrivilegeLevelThree}
                                    name="group1"
                                    checked={newUser.privilegeLevel === 3}
                                />
                                <Form.Check // prettier-ignore
                                    inline
                                    type="radio"
                                    label="Verwaltung"
                                    onClick={handlePrivilegeLevelTwo}
                                    checked={newUser.privilegeLevel === 2}
                                    name="group1"
                                />
                                <Form.Check // prettier-ignore
                                    inline
                                    type="radio"
                                    label="Standortleitung"
                                    onClick={handlePrivilegeLevelOne}
                                    name="group1"
                                    checked={newUser.privilegeLevel === 1}
                                />
                                <Form.Check // prettier-ignore
                                    inline
                                    type="radio"
                                    label="Gruppenleitung"
                                    onClick={handlePrivilegeLevelZero}
                                    checked={newUser.privilegeLevel === 0}
                                    name="group1"
                                />
                            </Form>
                            Wähle die Nutzer aus die von diesem Nutzer verwaltet werden:
                            <StyledUserTable
                                users={testObject}
                                interactButton={'Auswählen'}
                                interactButtonHandler={handleAddManagedUser}
                            />
                        </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <StyledCancelButton onClick={setShowModalFalse}>
                        Abbrechen
                    </StyledCancelButton>
                    <StyledButton onClick={(privilegeOn && handleAddUser) || (!privilegeOn && handleAddNormalUser)}>
                        Nutzer hinzufügen
                    </StyledButton>
                </Modal.Footer>
            </StyledModalDiv>
        </Modal>
    )
}

AddUserModal.propTypes = {
    showModal: PropTypes.bool,
    setShowModalFalse: PropTypes.func,
    testObject: PropTypes.object,
}

export default AddUserModal;