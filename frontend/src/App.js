import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Assignment from './Pages/Addproject/Assignment';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Assignment />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;