//import react from 'react';
import UsersTable from "../components/UsersTable";
import PropTypes from "prop-types";
import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // das muss auch noch iwie auf die tabelle zugreifen 
    console.log('Logging in with', username, password);
  };

  const handleForgotPassword = () => {
    // Placeholder
    alert('Wir haben Ihnen eine E-Mail geschickt, um Ihr Passwort zu erneuen (placeholder)');
  };

  return (
    <div className="login-container">
      <h3>Essensausgabe</h3>  
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Benutzername:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Passwort:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        <div className="forgot-password">
          <a href="#!" onClick={handleForgotPassword}>
            Passwort vergessen
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;


//other stuff

//const Login = props => {
  //  const { users } = props;

  //  return <div>hello</div>;
//}

//Login.propTypes = {
  //  users: PropTypes.object,
//}

//export default Login;