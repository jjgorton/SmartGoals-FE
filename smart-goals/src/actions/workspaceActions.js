import axiosWithAuth from '../utils/axiosWithAuth';

export const GET_WORKSPACE_START = 'GET_WORKSPACE_START';
export const GET_WORKSPACE_SUCCESS = 'GET_WORKSPACE_SUCCESS';
export const GET_WORKSPACE_FAILURE = 'GET_WORKSPACE_FAILURE';

export const ADD_WORKSPACE_START = 'ADD_WORKSPACE_START';
export const ADD_WORKSPACE_SUCCESS = 'ADD_WORKSPACE_SUCCESS';
export const ADD_WORKSPACE_FAILURE = 'ADD_WORKSPACE_FAILURE';

export const DELETE_WORKSPACE_START = 'DELETE_WORKSPACE_START';
export const DELETE_WORKSPACE_SUCCESS = 'DELETE_WORKSPACE_SUCCESS';
export const DELETE_WORKSPACE_FAILURE = 'DELETE_WORKSPACE_FAILURE';

export const getWorkspaces = () => (dispatch) => {
    dispatch({ type: GET_WORKSPACE_START });
    return axiosWithAuth()
        .get(`${process.env.REACT_APP_BACK_END_URL}/workspace/workspaceList`)
        .then((res) => {
            dispatch({
                type: GET_WORKSPACE_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_WORKSPACE_FAILURE,
                payload: err,
            });
        });
};

export const addWorkspace = (wsInfo) => (dispatch) => {
    dispatch({ type: ADD_WORKSPACE_START });
    return axiosWithAuth()
        .post(
            `${process.env.REACT_APP_BACK_END_URL}/workspace/createWorkspace`,
            wsInfo
        )
        .then((res) => {
            console.log('ADD_action', res);
            dispatch({
                type: ADD_WORKSPACE_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log('ADD_actio_ERR', err);
            dispatch({
                type: ADD_WORKSPACE_FAILURE,
                payload: err,
            });
        });
};

export const deleteWorkspace = (wsID) => (dispatch) => {
    dispatch({ type: DELETE_WORKSPACE_START });
    return axiosWithAuth()
        .delete(`${process.env.REACT_APP_BACK_END_URL}/workspace/${wsID}`)
        .then((res) => {
            dispatch({
                type: DELETE_WORKSPACE_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: DELETE_WORKSPACE_FAILURE,
                payload: err,
            });
        });
};
