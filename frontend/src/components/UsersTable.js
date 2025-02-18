import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Button, Table} from "react-bootstrap";
import TableRow from "./helperComponents/TableRow";
import CustomDatePicker from "./helperComponents/CustomDatePicker";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import { IoReload } from "react-icons/io5";

const StyledTableBox = styled.div`
    border: none;
    border-radius: 5px;
    max-height: 300px;
    overflow: auto;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    margin-top: 5px;
`

const StyledSearch = styled.input`
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
    margin-top: 5px;
    border: none;
    border-radius: 5px;
`

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

const UsersTable = props => {
    const {
        title,
        description,
        users,
        addOrder,
        editOrder,
        deleteOrder,
        interactButton,
        interactButtonHandler,
        reload,
        qrCode,
    } = props;

    const [search, setSearch] = useState('')
    const [date, setDate] = useState(new Date());

    const filteredUsers = users && users.filter(
        user => {
            return(
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.id.toLowerCase().includes(search.toLowerCase())
            );
        }
    );

    const handleSearchInputChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <h2>{title} {' '}{reload && <StyledButton onClick={reload}><IoReload/></StyledButton>}</h2>

            <div>{description}<br />
                {
                    (addOrder || editOrder || deleteOrder) ?
                        <CustomDatePicker date={date} setDate={setDate}/> :
                        <div />
                }
            </div>
            <StyledSearch
                type="text"
                value={search}
                onChange={handleSearchInputChange}
                placeholder='Suche Person (Name oder ID)'
            />
            <StyledTableBox>
                <Table striped>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        {addOrder && <th>Essen bestellen</th>}
                        {editOrder && <th>Bestellung ändern</th>}
                        {deleteOrder && <th>Bestellung löschen</th>}
                        {interactButton && <th>{interactButton}</th>}
                        {qrCode && <th>QR-Code</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {users && filteredUsers.map(user => (
                        <TableRow
                            user={user}
                            day={date}
                            addOrder={addOrder}
                            editOrder={editOrder}
                            deleteOrder={deleteOrder}
                            interact={interactButton}
                            interactHandler={interactButtonHandler}
                            qrCode={qrCode}
                        />
                    ))}
                    {!users && <th>no data</th>}
                    </tbody>
                </Table>
            </StyledTableBox>
        </>
    )
}

UsersTable.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    users: PropTypes.array,
    addOrder: PropTypes.bool,
    editOrder: PropTypes.bool,
    deleteOrder: PropTypes.bool,
    interactButton: PropTypes.string,
    interactButtonHandler: PropTypes.func,
    reload: PropTypes.func,
    qrCode: PropTypes.bool,
}

export default UsersTable;