import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserActionsPage = () => {
    const navigate = useNavigate();

    const handleAction = (action) => {
        alert(`${action} User Clicked`);
    };

    const buttonStyle = {
        width: '100%',
        padding: '20px',
        fontSize: '24px',  // Increased font size for buttons
        backgroundColor: '#7b00ff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '10px 0'
    };

    const backButtonStyle = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#444',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    const titleContainerStyle = {
        backgroundColor: 'red',
        color: 'white',
        padding: '20px 40px',
        borderRadius: '10px',
        fontSize: '28px',
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        top: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'fit-content'
    };

    return (
        <div style={{
            height: '100vh',
            backgroundColor: 'black',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        }}>
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                style={backButtonStyle}
            >
                ← Back
            </button>

            {/* User Actions Title in Red Rectangle */}
            <div style={titleContainerStyle}>
                User Actions
            </div>

            {/* Action Buttons */}
            <button onClick={() => navigate('/delete-user')} style={buttonStyle}>
                Delete User
            </button>
            <button onClick={() => handleAction('Edit')} style={buttonStyle}>
                Edit User
            </button>
            <button onClick={() => navigate('/add-user')} style={buttonStyle}>
                Add User
            </button>
        </div>
    );
};

export default UserActionsPage;
