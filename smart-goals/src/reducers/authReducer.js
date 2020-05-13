import {
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER_START,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
} from '../actions/authActions';

const initialState = {
    userID: null,
    username: '',
    email: '',
    created_at: '',
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    console.log('authreducer', state);
    switch (action.type) {
        case REGISTER_START:
            return {
                ...state,
                loading: true,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case LOGIN_START:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                userID: action.payload.user_id,
                username: action.payload.username,
                email: action.payload.email,
                created_at: action.payload.created_at,
                loading: false,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case GET_USER_START:
            return {
                ...state,
                loading: true,
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                userID: action.payload.user_id,
                username: action.payload.username,
                email: action.payload.email,
                created_at: action.payload.created_at,
                loading: false,
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
