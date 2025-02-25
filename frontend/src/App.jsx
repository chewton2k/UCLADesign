import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/templates' element={<HomePage/>}> </Route>
                <Route path='/create-design' element={<HomePage/>}> </Route>
                <Route path='/login' element={<HomePage/>}> </Route>
                <Route path='/signup' element={<HomePage/>}> </Route>
            </Routes>
        </Router>
    );
}

export default App;