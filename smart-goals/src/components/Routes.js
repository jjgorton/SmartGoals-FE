import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import WorkspacesList from './workspace/WorkspacesList';
import Register from './auth/Register';
import Login from './auth/Login';
import Welcome from './welcome/Welcome';

const Routes = props => {
    return (
        <>
            <h2>Routes</h2>
            <Route exact path='/' component={Welcome} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/workspaces' component={WorkspacesList} />
        </>
    );
};

export default Routes;
