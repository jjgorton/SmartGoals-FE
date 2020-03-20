import axiosWithAuth from '../utils/axiosWithAuth';

export const GET_GOALS_START = 'GET_GOALS_START';
export const GET_GOALS_SUCCESS = 'GET_GOALS_SUCCESS';
export const GET_GOALS_FAILURE = 'GET_GOALS_FAILURE';

export const ADD_GOAL_START = 'ADD_GOAL_START';
export const ADD_GOAL_SUCCESS = 'ADD_GOAL_SUCCESS';
export const ADD_GOAL_FAILURE = 'ADD_GOAL_FAILURE';

export const DELETE_GOAL_START = 'DELETE_GOAL_START';
export const DELETE_GOAL_SUCCESS = 'DELETE_GOAL_SUCCESS';
export const DELETE_GOAL_FAILURE = 'DELETE_GOAL_FAILURE';

export const getGoals = wsID => dispatch => {
    dispatch({ type: GET_GOALS_START });
    return axiosWithAuth()
        .get(`http://localhost:5000/goals/${wsID}`)
        .then(res => {
            console.log(res.data);
            dispatch({ type: GET_GOALS_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: GET_GOALS_FAILURE, payload: err });
        });
};
