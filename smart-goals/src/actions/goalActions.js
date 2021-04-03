import axiosWithAuth from '../utils/axiosWithAuth';

export const GET_GOALS_START = 'GET_GOALS_START';
export const GET_GOALS_SUCCESS = 'GET_GOALS_SUCCESS';
export const GET_GOALS_FAILURE = 'GET_GOALS_FAILURE';

export const ADD_GOAL_START = 'ADD_GOAL_START';
export const ADD_GOAL_SUCCESS = 'ADD_GOAL_SUCCESS';
export const ADD_GOAL_FAILURE = 'ADD_GOAL_FAILURE';

export const UPDATE_GOAL_START = 'UPDATE_GOAL_START';
export const UPDATE_GOAL_SUCCESS = 'UPDATE_GOAL_SUCCESS';
export const UPDATE_GOAL_FAILURE = 'UPDATE_GOAL_FAILURE';

export const DELETE_GOAL_START = 'DELETE_GOAL_START';
export const DELETE_GOAL_SUCCESS = 'DELETE_GOAL_SUCCESS';
export const DELETE_GOAL_FAILURE = 'DELETE_GOAL_FAILURE';

//GET STEPS not necessary as getGoals includes steps

export const ADD_STEP_START = 'ADD_STEP_START';
export const ADD_STEP_SUCCESS = 'ADD_STEP_SUCCESS';
export const ADD_STEP_FAILURE = 'ADD_STEP_FAILURE';

export const DELETE_STEP_START = 'DELETE_STEP_START';
export const DELETE_STEP_SUCCESS = 'DELETE_STEP_SUCCESS';
export const DELETE_STEP_FAILURE = 'DELETE_STEP_FAILURE';

export const UPDATE_STEP_START = 'UPDATE_STEP_START';
export const UPDATE_STEP_SUCCESS = 'UPDATE_STEP_SUCCESS';
export const UPDATE_STEP_FAILURE = 'UPDATE_STEP_FAILURE';

//the response includes an array of steps in each goal object
export const getGoals = (wsID) => (dispatch) => {
    dispatch({ type: GET_GOALS_START });
    return axiosWithAuth()
        .get(`${process.env.REACT_APP_BACK_END_URL}/goals/${wsID}`)
        .then((res) => {
            console.log(res.data);
            dispatch({ type: GET_GOALS_SUCCESS, payload: res.data });
        })
        .catch((err) => {
            console.log(err);
            dispatch({ type: GET_GOALS_FAILURE, payload: err });
        });
};

export const addGoal = (goalInfo) => (dispatch) => {
    dispatch({ type: ADD_GOAL_START });
    return axiosWithAuth()
        .post(`${process.env.REACT_APP_BACK_END_URL}/goals/`, goalInfo)
        .then((res) => {
            dispatch({
                type: ADD_GOAL_SUCCESS,
                payload: res.data.goal,
            });
        })
        .catch((err) => {
            dispatch({ type: ADD_GOAL_FAILURE, payload: err });
        });
};

export const addStep = (stepInfo) => (dispatch) => {
    dispatch({ type: ADD_STEP_START });
    return axiosWithAuth()
        .post(`${process.env.REACT_APP_BACK_END_URL}/goals/step`, stepInfo)
        .then((res) => {
            dispatch({
                type: ADD_STEP_SUCCESS,
                payload: res.data.step,
            });
        })
        .catch((err) => {
            dispatch({ type: ADD_STEP_FAILURE, payload: err });
        });
};

export const updateGoal = (newInfo) => (dispatch) => {
    dispatch({ type: UPDATE_GOAL_START, payload: newInfo });
    return axiosWithAuth()
        .put(`${process.env.REACT_APP_BACK_END_URL}/goals/`, newInfo)
        .then((res) => {
            console.log('updateGoal', res.data);
            dispatch({
                type: UPDATE_GOAL_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: UPDATE_GOAL_FAILURE, payload: err });
        });
};

export const updateStep = (newInfo) => (dispatch) => {
    console.log('update step info', newInfo);
    dispatch({ type: UPDATE_STEP_START });
    return axiosWithAuth()
        .put(`${process.env.REACT_APP_BACK_END_URL}/goals/step`, newInfo)
        .then((res) => {
            dispatch({
                type: UPDATE_STEP_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log('update step err', err.message);
            dispatch({ type: UPDATE_STEP_FAILURE, payload: err });
        });
};

export const deleteGoal = (goalID) => (dispatch) => {
    dispatch({ type: DELETE_GOAL_START });
    return axiosWithAuth()
        .delete(`${process.env.REACT_APP_BACK_END_URL}/goals/${goalID}`)
        .then((res) => {
            dispatch({ type: DELETE_GOAL_SUCCESS, payload: res.data });
        })
        .catch((err) => {
            dispatch({ type: DELETE_GOAL_FAILURE, payload: err });
        });
};

export const deleteStep = (goalID, stepID) => (dispatch) => {
    dispatch({ type: DELETE_STEP_START });
    return axiosWithAuth()
        .delete(
            `${process.env.REACT_APP_BACK_END_URL}/goals/${goalID}/${stepID}`
        )
        .then((res) => {
            dispatch({ type: DELETE_STEP_SUCCESS, payload: res.data });
        })
        .catch((err) => {
            dispatch({ type: DELETE_STEP_FAILURE, payload: err });
        });
};
