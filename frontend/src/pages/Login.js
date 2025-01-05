import react from 'react';
import UsersTable from "../components/UsersTable";
import PropTypes from "prop-types";

const Login = props => {
    const { users } = props;

    return <div>hello</div>;
}

Login.propTypes = {
    users: PropTypes.object,
}

export default Login;