import PropTypes from "prop-types";
import React, {useState} from 'react';
import styled from "styled-components";

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

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        // das muss auch noch iwie auf die tabelle zugreifen
        // TODO: RestAPI-Anfrage für Login
        // TODO: Bei erfolg, weiterleiten an Admin Seite, bei misserfolg meldung
        console.log('Logging in with', username, password);
    };

    const handleForgotPassword = () => {
        // Placeholder
        alert('Wir haben Ihnen eine E-Mail geschickt, um Ihr Passwort zu erneuen (placeholder)');
    };

    return (
        <ContainerDiv>
            <StyledH3>Essensausgabe</StyledH3>
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

export default Login;