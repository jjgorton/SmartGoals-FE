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
    DELETE_GOAL_FAILURE,
    ADD_STEP_START,
    ADD_STEP_SUCCESS,
    ADD_STEP_FAILURE,
    DELETE_STEP_START,
    DELETE_STEP_SUCCESS,
    DELETE_STEP_FAILURE,
    UPDATE_STEP_START,
    UPDATE_STEP_SUCCESS,
    UPDATE_STEP_FAILURE,
} from '../actions/goalActions';

const initialState = {
    list: [],
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_GOALS_START:
            return {
                ...state,
                loading: true,
            };
        case GET_GOALS_SUCCESS:
            return {
                ...state,
                loading: false,
                list: action.payload,
            };
        case GET_GOALS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_GOAL_START:
            return {
                ...state,
                loading: true,
            };
        case ADD_GOAL_SUCCESS:
            return {
                ...state,
                loading: false,
                list: [...state.list, action.payload],
            };
        case ADD_GOAL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_GOAL_START:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_GOAL_SUCCESS:
            return {
                ...state,
                loading: false,
                list: state.list.map((goal) => {
                    // this won't work for a deep copy (steps obj)
                    // possibly create separate reducer
                    // change this to not update here but rather use componenent state to avoid a rerender of the entire list
                    return goal.id === action.payload.id
                        ? Object.assign(goal, action.payload)
                        : goal;
                }),
            };
        case UPDATE_GOAL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_GOAL_START:
            return {
                ...state,
                loading: true,
            };
        case DELETE_GOAL_SUCCESS:
            return {
                ...state,
                loading: false,
                list: state.list.filter(
                    (goal) => goal.id !== parseInt(action.payload.goalID)
                ),
            };
        case DELETE_GOAL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_STEP_START:
            return {
                ...state,
                loading: true,
            };
        case ADD_STEP_SUCCESS:
            return {
                ...state,
                loading: false,
                list: state.list.map((goal) => {
                    if (goal.id === action.payload.goal_id) {
                        goal.steps.push(action.payload);
                    }
                    return goal;
                }),
            };
        case ADD_STEP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
