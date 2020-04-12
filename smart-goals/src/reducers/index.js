import { combineReducers } from 'redux';
import authReducer from './authReducer';
import workspaceReducer from './workspaceReducer';
import goalReducer from './goalReducer';
import { USER_LOGGED_OUT } from '../actions/authActions';

const appReducer = combineReducers({
    auth: authReducer,
    workspaces: workspaceReducer,
    goals: goalReducer,
});

const rootReducer = (state, action) => {
    if (action.type === USER_LOGGED_OUT) {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
