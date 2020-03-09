import {
    GET_WORKSPACE_START,
    GET_WORKSPACE_SUCCESS,
    GET_WORKSPACE_FAILURE,
    ADD_WORKSPACE_START,
    ADD_WORKSPACE_SUCCESS,
    ADD_WORKSPACE_FAILURE
} from '../actions/workspaceActions';

const initialState = {
    list: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_WORKSPACE_START:
            return {
                ...state,
                loading: true
            };
        case GET_WORKSPACE_SUCCESS:
            return {
                ...state,
                loading: false,
                list: action.payload.workspaces
            };
        case GET_WORKSPACE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADD_WORKSPACE_START:
            return {
                ...state,
                loading: true
            };
        case ADD_WORKSPACE_SUCCESS:
            return {
                ...state,
                loading: false,
                list: [...state.list, action.payload]
            };
        default:
            return state;
    }
};
