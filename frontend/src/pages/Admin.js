import React from 'react';
import UsersTable from "../components/UsersTable";
import PropTypes from "prop-types";
import UserServicesButton from "../components/UserServicesButton";  // Ensure correct import name

const Admin = (props) => {
    const { users } = props;

    return (
        <div style={{ width: '100%', padding: '20px' }}>  {/* Added padding for spacing */}
            <UsersTable users={users} />
            <div style={{ width: '100%', marginTop: '20px' }}>  {/* Added margin for separation */}
                <UserServicesButton />
            </div>
        </div>
    );
};

Admin.propTypes = {
    users: PropTypes.object,  // Kept propTypes as requested
};

export default Admin;
