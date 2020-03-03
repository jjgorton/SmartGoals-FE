import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WorkspaceCard from './WorkspaceCard';

import { getWorkspaces } from '../../actions/workspaceActions';

const WorkspaceList = props => {
    const user = useSelector(state => state.auth);
    const workspaces = useSelector(state => state.workspaces);
    const dispatch = useDispatch();
    //get list of all workspaces
    useEffect(() => {
        console.log('userID', user.userID);
        dispatch(getWorkspaces(user.userID));
    }, []);

    //create a new workspace button to pull open create new modal? new component
    console.log(workspaces);
    return (
        <div className='workspace-list'>
            <h3>All the Workspaces listed here</h3>
            {workspaces.list.map(ws => (
                <WorkspaceCard ws={ws} />
            ))}
        </div>
    );
};

export default WorkspaceList;
