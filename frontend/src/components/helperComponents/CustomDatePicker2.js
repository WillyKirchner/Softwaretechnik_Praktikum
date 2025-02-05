import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const StyledDatePicker = styled(DatePicker)`
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
    margin-top: 5px;
    border: none;
    border-radius: 5px;
    background-color: #90EE90;
    margin-bottom: 30px;
`

const CustomDatePicker2 = props => {
    const { date, setDate } = props;

    const addDays = (date, days) => {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    return (
        <StyledDatePicker
            showMonthYearDropdown={false}
            selected={date}
            onChange={(date)=>setDate(date)}
            minDate={new Date()}
            maxDate={addDays(new Date(),14)}
            dateFormat="dd/MM/yyyy"
        />
    );
}

CustomDatePicker2.propTypes = {
    date: PropTypes.instanceOf(Date),
    setDate: PropTypes.func,
}

export default CustomDatePicker2