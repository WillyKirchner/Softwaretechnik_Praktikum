import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Overview from "./pages/Overview";


function App() {

    const [loggedIn, setLoggedIn] = useState(false)

  return (
    <Router>
      <Routes>
 //       <Route path="/" element={<Login loggedInHandler={setLoggedIn}/>} />
          <Route path="/Admin" element={<Admin isLoggedIn={loggedIn}/>} />
          <Route path="/Overview" element={<Overview isLoggedIn={loggedIn}/>} />
 //   </Routes>
    </Router>
  );
}

export default App;
