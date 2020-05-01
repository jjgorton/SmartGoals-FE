import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Nav from './components/nav/Nav';
import Routes from './components/Routes';

function App() {
    return (
        <div className='App'>
            <Router>
                <Nav />
                <Routes />
            </Router>
        </div>
    );
}

export default App;
