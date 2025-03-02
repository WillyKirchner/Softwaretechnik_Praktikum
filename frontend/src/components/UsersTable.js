import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Table } from "react-bootstrap";
import TableRow from "./helperComponents/TableRow";
import CustomDatePicker from "./helperComponents/CustomDatePicker";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

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
            <h2>{title}</h2>
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
}

export default UsersTable;