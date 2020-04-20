import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const GET_USER_START = 'GET_USER_START';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export const register = (user) => (dispatch) => {
    dispatch({ type: REGISTER_START });
    return axios
        .post(`${process.env.REACT_APP_BACK_END_URL}/user/register`, user)
        .then((res) => {
            localStorage.setItem('token', res.data.token);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: REGISTER_FAILURE,
                payload: err,
            });
        });
};

export const login = (creds) => (dispatch) => {
    dispatch({ type: LOGIN_START });
    return axios
        .post(`${process.env.REACT_APP_BACK_END_URL}/user/login`, creds)
        .then((res) => {
            localStorage.setItem('token', res.data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log('ERR****', { err });
            dispatch({
                type: LOGIN_FAILURE,
                payload: err,
            });
        });
};

export const userInfo = () => (dispatch) => {
    dispatch({ type: GET_USER_START });
    return axiosWithAuth()
        .get(`${process.env.REACT_APP_BACK_END_URL}/user/`)
        .then((res) => {
            dispatch({
                type: GET_USER_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_USER_FAILURE,
                payload: err,
            });
        });
};

export const clearStore = () => (dispatch) => {
    dispatch({ type: USER_LOGGED_OUT });
};
