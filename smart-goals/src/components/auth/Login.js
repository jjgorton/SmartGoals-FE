import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../actions/authActions';

import Nav from '../nav/Nav';

import './auth.scss';

const Login = (props) => {
    const state = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChanges = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.clear();
        dispatch(login(credentials)).then(() => {
            props.history.push('/user/workspaces');
        });
    };

    useEffect(() => {
        if (state.error && state.error.response) {
            setErrorMessage(state.error.response.data.message);
        } else if (state.error) {
            setErrorMessage(state.error.message);
        }
    }, [state.error]);

    return (
        <>
            <Nav loggedIn={false} />
            <div className='auth-container'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='input'>
                        <label htmlFor='username'>Username:</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            placeholder='Username'
                            autoComplete='username'
                            value={credentials.username}
                            onChange={handleChanges}
                            autoFocus
                            required
                        />
                    </div>
                    <div className='input'>
                        <label htmlFor='password'>Password:</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Password'
                            autoComplete='current-password'
                            value={credentials.password}
                            onChange={handleChanges}
                            required
                        />
                    </div>
                    <button>Login</button>

                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            </div>
        </>
    );
};

export default Login;
