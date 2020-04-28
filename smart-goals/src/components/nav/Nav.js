//register and login navlinks should be here

//possibly separate nav bar once logged in for switching workspaces and other potential settings.
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import './nav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { userInfo, clearStore } from '../../actions/authActions';

import NavMenu from './NavMenu';

const Nav = () => {
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    // const history = useHistory();

    // const logout = () => {
    //     localStorage.clear();
    //     dispatch(clearStore());
    //     history.push('/login');
    // };

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
                <>
                    <FontAwesomeIcon
                        icon={faEllipsisV}
                        className='menu-icon'
                        onClick={() => setShow(true)}
                    />
                    <NavMenu show={show} setShow={setShow} />
                </>
            )}
        </div>
    );
};

export default Nav;
