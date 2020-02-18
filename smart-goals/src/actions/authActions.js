import axios from 'axios';

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const register = user => dispatch => {
    dispatch({ type: REGISTER_START });
    return axios
        .post('http://localhost:5000/user/register', user)
        .then(res => {
            localStorage.setItem('token', res.data.token);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data.message
            });
        })
        .catch(err => {
            dispatch({
                type: REGISTER_FAILURE,
                payload: err.message
            });
        });
};

export const login = creds => dispatch => {
    dispatch({ type: LOGIN_START });
    return axios
        .post('http://localhost:5000/user/login', creds)
        .then(res => {
            localStorage.setItem('token', res.data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.message
            });
        })
        .catch(err => {
            console.log('ERR****', { err });
            dispatch({
                type: LOGIN_FAILURE,
                payload: err
            });
        });
};
