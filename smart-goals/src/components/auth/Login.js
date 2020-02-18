import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../actions/authActions';

const Login = props => {
    const state = useSelector(state => state.auth);
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const handleChanges = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        localStorage.clear();
        dispatch(login(credentials)).then(() => {
            props.history.push('/workspaces');
        });
    };

    // const errorMessage =
    //     state.error !== null && state.error.response
    //         ? state.error.response.data.message
    //         : state.error;
    useEffect(() => {
        if (state.error && state.error.response) {
            console.log('IFFFFF', state);
            setErrorMessage(state.error.response.data.message);
        } else if (state.error) {
            console.log('EEEELLSEEE', state);
            setErrorMessage(state.error.message);
        }
    }, [state.error]);

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button>Login</button>
                {/* {state.error && <p>{state.error.message}</p>} */}
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </>
    );
};

export default Login;
