import { combineReducers } from 'redux';
import authReducer from './authReducer';
import workspaceReducer from './workspaceReducer';
import goalReducer from './goalReducer';

export default combineReducers({
    auth: authReducer,
    workspaces: workspaceReducer,
    goals: goalReducer
});
