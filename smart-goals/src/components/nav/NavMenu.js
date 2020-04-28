import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { clearStore } from '../../actions/authActions';

import './navMenu.scss';

const NavMenu = ({ show, setShow }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        dispatch(clearStore());
        history.push('/login');
    };

    // const display = () => {
    //     setShow(false);
    //     console.log(show);
    // };

    return (
        <div
            className={show ? `nav-menu-container` : `menu-hide`}
            onClick={() => setShow(false)}
        >
            <div className={show ? 'nav-menu' : 'nav-menu'}>
                <p className='nav-menu-item' onClick={() => logout()}>
                    Logout
                </p>
            </div>
        </div>
    );
};

export default NavMenu;
