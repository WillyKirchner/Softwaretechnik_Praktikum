import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersTable from '../components/UsersTable';

const DeleteUserPage = () => {
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

    const handleDeleteByForm = () => {
        alert(`Deleting User: ${user.name} ${user.surname} (ID: ${user.id})`);
        // Implement actual delete logic here
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
            height: '100vh'
        }}>
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                style={backButtonStyle}
            >
                ← Back
            </button>

            <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Delete User</h1>

            {/* Option 1: Delete Directly from List */}
            <h2>Delete Directly from List</h2>
            <UsersTable />

            {/* Option 2: Delete by Entering Info */}
            <h2 style={{ marginTop: '40px' }}>Delete by Entering Info</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                    onClick={handleDeleteByForm}
                    style={{
                        marginTop: '20px',
                        padding: '15px 40px',
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '18px'
                    }}
                >
                    Delete User
                </button>
            </div>
        </div>
    );
};

export default DeleteUserPage;
