import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserServicesButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/user-actions');
    };

    return (
        <button
            onClick={handleClick}
            style={{
                width: '100%',
                padding: '20px',
                fontSize: '18px',
                backgroundColor: '#7b00ff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}
        >
            Manage Users
        </button>
    );
};

export default UserServicesButton;
