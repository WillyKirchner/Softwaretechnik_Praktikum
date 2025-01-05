import react from 'react';
import UsersTable from "../components/UsersTable";
import PropTypes from "prop-types";

const Admin = props => {
    const { users } = props;

    return <UsersTable users={users} />;
}

Admin.propTypes = {
    users: PropTypes.object,
}

export default Admin;