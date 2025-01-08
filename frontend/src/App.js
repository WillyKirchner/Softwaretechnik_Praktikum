import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from "./pages/Admin";
import UserServicesButton from './components/UserServicesButton';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Admin />} />
                <Route path="/user-services" element={<UserServicesButton />} />
            </Routes>
        </Router>
    );
}

export default App;
