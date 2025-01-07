import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Table } from "react-bootstrap";
import TableRow from "./helperComponents/TableRow";
import DatePicker from "react-datepicker";
import CustomDatePicker from "./helperComponents/CustomDatePicker";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

const testObject = [
    { name: 'Willy Fritz', id: '0001' },
    { name: 'Max Moloch', id: '0002' },
    { name: 'Michelangelo', id: '0003' },
    { name: 'Caravaggio', id: '0004' },
    { name: 'Marx', id: '0005' },
    { name: 'Nietzsche', id: '0006' },
    { name: 'Dostojevsky', id: '0007' },
    { name: 'Simone', id: '0008' },
    { name: 'Mose', id: '0009' },
    { name: 'Homer', id: '0010' },
    { name: 'Adorno', id: '0011' },
    { name: 'Fromm', id: '0012' },
]

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
    const { users } = props;

    const [search, setSearch] = useState('')
    const [date, setDate] = useState(new Date());

    const filteredUsers = testObject.filter(
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
            <h2>Bestellübersicht</h2>
            <div>Wähle hier das Datum für welches du bestellen möchtest: <br />
                <CustomDatePicker date={date} setDate={setDate}/>
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
                        <th>Essen bestellen</th>
                        <th>Bestellung ändern</th>
                        <th>Bestellung löschen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map(user => (<TableRow user={user} day={date}/>))}
                    </tbody>
                </Table>
            </StyledTableBox>
        </>
    )
}

UsersTable.propTypes = {
    users: PropTypes.array,
}

export default UsersTable;