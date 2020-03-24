import {
    GET_GOALS_START,
    GET_GOALS_SUCCESS,
    GET_GOALS_FAILURE,
    ADD_GOAL_START,
    ADD_GOAL_SUCCESS,
    ADD_GOAL_FAILURE,
    UPDATE_GOAL_START,
    UPDATE_GOAL_SUCCESS,
    UPDATE_GOAL_FAILURE,
    DELETE_GOAL_START,
    DELETE_GOAL_SUCCESS,
    DELETE_GOAL_FAILURE
} from '../actions/goalActions';

const initialState = {
    list: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_GOALS_START:
            return {
                ...state,
                loading: true
            };
        case GET_GOALS_SUCCESS:
            return {
                ...state,
                loading: false,
                list: action.payload
            };
        case GET_GOALS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADD_GOAL_START:
            return {
                ...state,
                loading: true
            };
        case ADD_GOAL_SUCCESS:
            return {
                ...state,
                loading: false,
                list: [...state.list, action.payload]
            };
        case ADD_GOAL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_GOAL_START:
            return {
                ...state,
                loading: true
            };
        case UPDATE_GOAL_SUCCESS:
            return {
                ...state,
                loading: false,
                list: state.list.map(goal => {
                    // this won't work for a deep copy (steps obj)
                    // possibly create separate reducer
                    return goal.id === action.payload.id
                        ? Object.assign(goal, action.payload)
                        : goal;
                })
            };
        case UPDATE_GOAL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DELETE_GOAL_START:
            return {
                ...state,
                loading: true
            };
        case DELETE_GOAL_SUCCESS:
            return {
                ...state,
                loading: false,
                list: state.list.filter(
                    goal => goal.id !== parseInt(action.payload.goalID)
                )
            };
        case DELETE_GOAL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
