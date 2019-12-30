import {
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../actions/authActions';

const initialState = {
    username: '',
    userID: '',
    email: '',
    workspaces: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_START:
            return {
                ...state,
                loading: true
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case LOGIN_START:
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
