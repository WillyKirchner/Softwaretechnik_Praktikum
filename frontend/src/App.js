import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from "./pages/Admin";
import UserActionsPage from './components/UserActionsPage';
import DeleteUserPage from './components/DeleteUserPage';
import AddUserPage from './components/AddUserPage';
import UserServicesButton from './components/UserServicesButton';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Admin />} />
                <Route path="/user-actions" element={<UserActionsPage />} />
                <Route path="/delete-user" element={<DeleteUserPage />} />
                <Route path="/add-user" element={<AddUserPage />} />
                <Route path="/user-services" element={<UserServicesButton />} />
            </Routes>
        </Router>
    );
}

export default App;
