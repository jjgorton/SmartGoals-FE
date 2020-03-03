import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
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
    if (workspaces.loading) {
        return (
            <Loader
                type='Triangle'
                color='blue'
                height={100}
                width={100}
                timeout={2000}
            />
        );
    }
    return (
        <div className='workspace-list'>
            <h3>All the Workspaces listed here</h3>
            {workspaces.list.map((ws, i) => (
                <WorkspaceCard key={i} ws={ws} />
            ))}
        </div>
    );
};

export default WorkspaceList;
