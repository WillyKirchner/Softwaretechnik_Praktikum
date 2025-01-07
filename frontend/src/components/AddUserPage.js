import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUserPage = ({ onUserAdd }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        surname: '',
        id: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = () => {
        if (user.name && user.surname && user.id) {
            onUserAdd(user);  // Pass the new user to parent component
            navigate(-1);  // Go back to the previous page
        } else {
            alert('Please fill in all fields');
        }
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

    return (
        <div style={{
            padding: '40px',
            backgroundColor: 'black',
            color: 'white',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Back Button */}
            <button onClick={() => navigate(-1)} style={backButtonStyle}>
                ← Back
            </button>

            <h1>Add New User</h1>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={user.name}
                onChange={handleInputChange}
                style={{ padding: '10px', margin: '10px', width: '300px' }}
            />
            <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={user.surname}
                onChange={handleInputChange}
                style={{ padding: '10px', margin: '10px', width: '300px' }}
            />
            <input
                type="text"
                name="id"
                placeholder="ID"
                value={user.id}
                onChange={handleInputChange}
                style={{ padding: '10px', margin: '10px', width: '300px' }}
            />
            <button
                onClick={handleSubmit}
                style={{
                    marginTop: '20px',
                    padding: '15px 40px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px'
                }}
            >
                Add User
            </button>
        </div>
    );
};

export default AddUserPage;
