//register and login navlinks should be here

//possibly separate nav bar once logged in for switching workspaces and other potential settings.
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import './nav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { userInfo, clearStore } from '../../actions/authActions';

import NavMenu from './NavMenu';

const Nav = ({ loggedIn, center, left, back }) => {
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    // const history = useHistory();

    // const logout = () => {
    //     localStorage.clear();
    //     dispatch(clearStore());
    //     history.push('/login');
    // };

    //if user.username is null GET user info from BE (incase of browser refresh causes redux state loss)
    useEffect(() => {
        if (loggedIn) {
            dispatch(userInfo());
        }
    }, []);

    console.log(user);
    return (
        <div className='nav'>
            <div className='left'>
                {back && (
                    <Link to={back} className='back-container'>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className='back-icon'
                        />
                    </Link>
                )}
                <h1 className='app-title'>Smart Goals</h1>
            </div>
            {!loggedIn && (
                <div className='nav-buttons'>
                    <NavLink to='/register' className='link'>
                        Register
                    </NavLink>
                    <NavLink to='/login' className='link'>
                        Login
                    </NavLink>
                </div>
            )}
            {loggedIn && <h2 className='center'>{center}</h2>}

            {loggedIn && (
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
