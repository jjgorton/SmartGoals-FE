import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div>
            <h2>Welcome to the Smart Goals app!</h2>
            <p>
                <Link to='/login'>Login</Link> and create a new workspace to
                start achieving your goals, or join your team's workspace to
                plan and accomplish together.
            </p>
            <p>
                Don't have an account yet? <Link to='/register'>Register</Link>{' '}
                to create a new one.
            </p>
        </div>
    );
};

export default Welcome;
