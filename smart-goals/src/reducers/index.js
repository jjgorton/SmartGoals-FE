import { combineReducers } from 'redux';
import authReducer from './authReducer';
import workspaceReducer from './workspaceReducer';

export default combineReducers({
    auth: authReducer,
    workspaces: workspaceReducer
});
