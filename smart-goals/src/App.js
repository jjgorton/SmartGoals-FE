import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Routes from './components/Routes';

function App() {
    return (
        <Router className='App'>
            <h1>Smart Goals</h1>
            <Routes />
        </Router>
    );
}

export default App;
