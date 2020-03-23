import axiosWithAuth from '../utils/axiosWithAuth';
import { DELETE_WORKSPACE_FAILURE } from './workspaceActions';

export const GET_GOALS_START = 'GET_GOALS_START';
export const GET_GOALS_SUCCESS = 'GET_GOALS_SUCCESS';
export const GET_GOALS_FAILURE = 'GET_GOALS_FAILURE';

export const ADD_GOAL_START = 'ADD_GOAL_START';
export const ADD_GOAL_SUCCESS = 'ADD_GOAL_SUCCESS';
export const ADD_GOAL_FAILURE = 'ADD_GOAL_FAILURE';

export const DELETE_GOAL_START = 'DELETE_GOAL_START';
export const DELETE_GOAL_SUCCESS = 'DELETE_GOAL_SUCCESS';
export const DELETE_GOAL_FAILURE = 'DELETE_GOAL_FAILURE';

export const UPDATE_GOAL_START = 'UPDATE_GOAL_START';
export const UPDATE_GOAL_SUCCESS = 'UPDATE_GOAL_SUCCESS';
export const UPDATE_GOAL_FAILURE = 'UPDATE_GOAL_FAILURE';

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

export const addGoal = goalInfo => dispatch => {
    dispatch({ type: ADD_GOAL_START });
    return axiosWithAuth()
        .post('http://localhost:5000/goals/', goalInfo)
        .then(res => {
            dispatch({
                type: ADD_GOAL_SUCCESS,
                payload: res.data.goal
            });
        })
        .catch(err => {
            dispatch({ type: ADD_GOAL_FAILURE, payload: err });
        });
};

export const updateGoal = newInfo => dispatch => {
    dispatch({ type: UPDATE_GOAL_START });
    return axiosWithAuth()
        .put('http://localhost:5000/goals/', newInfo)
        .then(res => {
            console.log('updateGoal', res.data);
            dispatch({
                type: UPDATE_GOAL_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({ type: UPDATE_GOAL_FAILURE, payload: err });
        });
};

export const deleteGoal = goalID => dispatch => {
    dispatch({ type: DELETE_GOAL_START });
    return axiosWithAuth()
        .delete(`http://localhost:5000/goals/${goalID}`)
        .then(res => {
            dispatch({ type: DELETE_GOAL_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: DELETE_WORKSPACE_FAILURE, payload: err });
        });
};
