//register and login navlinks should be here

//possibly separate nav bar once logged in for switching workspaces and other potential settings.
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import './nav.scss';

import { userInfo, clearStore } from '../../actions/authActions';

const Nav = () => {
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        dispatch(clearStore());
        history.push('/login');
    };

    //if user.username is null GET user infor from BE (need to build a GET for this)

    useEffect(() => {
        dispatch(userInfo());
    }, []);

    console.log(user);
    return (
        <div className='nav'>
            <h1 className='app-title'>Smart Goals</h1>
            {!user.username && (
                <div className='nav-buttons'>
                    <NavLink to='/register' className='link'>
                        Register
                    </NavLink>
                    <NavLink to='/login' className='link'>
                        Login
                    </NavLink>
                </div>
            )}
            {user.username && (
                <h2 className='username'>Hi, {user.username}!</h2>
            )}
            {user.username && (
                <div className='nav-buttons'>
                    <button onClick={() => logout()}>Logout</button>
                    <button>Settings</button>
                </div>
            )}
        </div>
    );
};

export default Nav;
