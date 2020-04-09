//register and login navlinks should be here

//possibly separate nav bar once logged in for switching workspaces and other potential settings.
import React from 'react';
import { useSelector } from 'react-redux';
import './nav.scss';

const Nav = () => {
    const user = useSelector(state => state.auth);

    //if user.username is null GET user infor from BE (need to build a GET for this)
    console.log(user);
    return (
        <div className='nav'>
            <h1 className='app-title'>Smart Goals</h1>
            {!user.username && (
                <div className='nav-buttons'>
                    <button>Register</button>
                    <button>Login</button>
                </div>
            )}
            {user.username && (
                <h2 className='username'>Hi, {user.username}!</h2>
            )}
            {user.username && (
                <div className='nav-buttons'>
                    <button>Logout</button>
                    <button>Settings</button>
                </div>
            )}
        </div>
    );
};

export default Nav;
