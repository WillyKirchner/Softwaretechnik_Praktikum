import PropTypes from "prop-types";
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import UsersTable from "../components/UsersTable";


//alles nur Ästhetik
const ContainerDiv = styled.div`
    width: 100%;
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
`

const StyledH2 = styled.h2`
    font-size: 20px;
    margin-bottom: 20px;
`
const StyledH3 = styled.h3`
    font-size: 12px;
    margin-bottom: 20px;
    color: purple;
`

const InputDiv = styled.div`
    margin-bottom: 15px;
`
const StyledLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    text-align: left;
`

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
`

const LoginButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #45a049;
    }
`
const ForgotPasswordDiv = styled.div`
    margin-top: 10px;
`
const StyledA = styled.a`
    color: #007bff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`
//Loginlogik
const Login = props => {

    const { loggedInHandler } = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //dummies eingefügt, aber eigentlich brauchen wir noch Verknüpfung mit csv vom Admin
    const dummyLogins = [
        { username: 'Arbeiter1', password: 'Passwort1' },
        { username: 'Arbeiter2', password: 'Passwort2' },
        { username: 'Arbeiter3', password: 'Passwort3' }
      ];

    const navigate = useNavigate(); // Used für redirecting

    const handleLogin = (event) => {
        
        event.preventDefault();
        // das muss auch noch iwie auf die tabelle zugreifen
        // TODO: RestAPI-Anfrage für Login
        // TODO: Bei erfolg, weiterleiten an Admin Seite, bei misserfolg meldung
        //console.log('Logging in with', username, password);
        // Check ob credentials dummy login daten matchen
        const user = dummyLogins.find(
            (login) => login.username === username && login.password === password);
  
        if (user) {
        // redirect zur Admin page
            loggedInHandler(true);
            localStorage.setItem('username', username);
            navigate('/Admin');
        } else {
        // wenn nicht matcht, Fehlermeldung
            loggedInHandler(false);
            setError('Benutzername oder Passwort ungültig ');
        }
    };

    const handleForgotPassword = () => {
        // Placeholder
        alert('Wir haben Ihnen eine E-Mail geschickt, um Ihr Passwort zu erneuern (placeholder)');
    };

    return (
        <ContainerDiv>
            <StyledH3>Mittagsversorgung</StyledH3>
            <StyledH2>Login</StyledH2>
            <form onSubmit={handleLogin}>
                <InputDiv>
                    <StyledLabel htmlFor="username">Benutzername:</StyledLabel>
                    <StyledInput
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </InputDiv>

                <InputDiv>
                    <StyledLabel htmlFor="password">Passwort:</StyledLabel>
                    <StyledInput
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </InputDiv>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <LoginButton type="submit">
                    Login
                </LoginButton>

                <ForgotPasswordDiv className="forgot-password">
                    <StyledA href="#!" onClick={handleForgotPassword}>
                        Passwort vergessen
                    </StyledA>
                </ForgotPasswordDiv>
            </form>
        </ContainerDiv>
    );
}

UsersTable.propTypes = {
    loggedInHandler: PropTypes.func,
}

export default Login;