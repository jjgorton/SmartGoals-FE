import {
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../actions/authActions';

const initialState = {
    userID: '',
    username: '',
    email: '',
    created_at: '',
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    console.log('authreducer', state);
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
                userID: action.payload.user_id,
                username: action.payload.username,
                email: action.payload.email,
                created_at: action.payload.created_at,
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
