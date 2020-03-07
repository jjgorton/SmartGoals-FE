import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from '../../utils/PrivateRoute';
import { Switch } from 'react-router-dom';
import WorkspacesList from '../workspace/WorkspacesList';
import Workspace from '../workspace/Workspace';

import { getWorkspaces } from '../../actions/workspaceActions';

const User = () => {
    const userID = localStorage.getItem('userID');
    const dispatch = useDispatch();

    //get list of all workspaces
    useEffect(() => {
        dispatch(getWorkspaces(userID));
    }, []);

    return (
        <div>
            <Switch>
                <PrivateRoute
                    path='/user/workspaces/:id'
                    component={Workspace}
                />
                <PrivateRoute
                    path='/user/workspaces'
                    component={WorkspacesList}
                />
            </Switch>
        </div>
    );
};

export default User;
