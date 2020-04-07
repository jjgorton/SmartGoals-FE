import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Nav from './components/nav/Nav';
import Routes from './components/Routes';

function App() {
    return (
        <Router className='App'>
            <Nav />
            <Routes />
        </Router>
    );
}

export default App;
