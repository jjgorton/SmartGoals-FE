import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../../actions/authActions';

import Nav from '../nav/Nav';

import './auth.scss';

const Register = (props) => {
    const state = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        email: '',
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
        dispatch(register(credentials)).then(() => {
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
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    {errorMessage && <p class='error'>{errorMessage}</p>}
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
                            required
                        />
                    </div>
                    <div className='input'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Email - Optional'
                            value={credentials.email}
                            onChange={handleChanges}
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
                </form>
            </div>
        </>
    );
};

export default Register;
