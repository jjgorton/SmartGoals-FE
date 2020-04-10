import React from 'react';
import { Link } from 'react-router-dom';
import './welcome.scss';

const Welcome = () => {
    return (
        <div className='welcome'>
            <h2>Welcome to Smart Goals!</h2>
            <p className='instructions'>
                <Link to='/login'>Login</Link> and create a new workspace to
                start achieving your goals, or join your team's workspace to
                plan and accomplish together.
            </p>
            <p className='instructions'>
                Don't have an account yet? <Link to='/register'>Register</Link>{' '}
                to create a new one.
            </p>
        </div>
    );
};

export default Welcome;
