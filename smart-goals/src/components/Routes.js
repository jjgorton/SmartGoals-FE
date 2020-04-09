import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import WorkspacesList from './workspace/WorkspacesList';
import Register from './auth/Register';
import Login from './auth/Login';
import Welcome from './welcome/Welcome';
import User from './user/User';
import Workspace from './workspace/Workspace';

const Routes = props => {
    return (
        <>
            <Route exact path='/' component={Welcome} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/user' component={User} />
        </>
    );
};

export default Routes;
