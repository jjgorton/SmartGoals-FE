import axiosWithAuth from '../utils/axiosWithAuth';

export const GET_WORKSPACE_START = 'GET_WORKSPACE_START';
export const GET_WORKSPACE_SUCCESS = 'GET_WORKSPACE_SUCCESS';
export const GET_WORKSPACE_FAILURE = 'GET_WORKSPACE_FAILURE';

export const ADD_WORKSPACE_START = 'ADD_WORKSPACE_START';
export const ADD_WORKSPACE_SUCCESS = 'ADD_WORKSPACE_SUCCESS';
export const ADD_WORKSPACE_FAILURE = 'ADD_WORKSPACE_FAILURE';

export const getWorkspaces = user_id => dispatch => {
    dispatch({ type: GET_WORKSPACE_START });
    return axiosWithAuth()
        .get(`http://localhost:5000/workspace/workspaceList/${user_id}`)
        .then(res => {
            dispatch({
                type: GET_WORKSPACE_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_WORKSPACE_FAILURE,
                payload: err
            });
        });
};

export const addWorkspace = wsInfo => dispatch => {
    const userID = localStorage.getItem('userID');
    dispatch({ type: ADD_WORKSPACE_START });
    return axiosWithAuth()
        .post(
            `http://localhost:5000/workspace/createWorkspace/${userID}`,
            wsInfo
        )
        .then(res => {
            console.log('ADD_action', res);
            dispatch({
                type: ADD_WORKSPACE_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('ADD_actio_ERR', err);
            dispatch({
                type: ADD_WORKSPACE_FAILURE,
                payload: err
            });
        });
};
