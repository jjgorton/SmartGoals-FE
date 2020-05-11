import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import WorkspaceCard from './WorkspaceCard';
import WorkspaceForm from './WorkspaceForm';

import { getWorkspaces } from '../../actions/workspaceActions';

import './workspacesList.scss';

const WorkspaceList = (props) => {
    // const userID = localStorage.getItem('userID');
    const workspaces = useSelector((state) => state.workspaces);
    // const dispatch = useDispatch();

    // //get list of all workspaces
    // useEffect(() => {
    //     dispatch(getWorkspaces(userID));
    // }, []);

    //create a new workspace button to pull open create new modal? new component
    console.log(workspaces);
    // if (workspaces.loading) {
    //     return (
    //         <Loader
    //             type='Triangle'
    //             color='blue'
    //             height={100}
    //             width={100}
    //             timeout={2000}
    //         />
    //     );
    // }
    return (
        <div className='ws-list-container'>
            <h3 className='ws-list-title'>Your Workspaces</h3>
            <div className='workspace-list'>
                {workspaces.list.map((ws, i) => (
                    <WorkspaceCard key={i} ws={ws} />
                ))}
                <WorkspaceForm />
            </div>
        </div>
    );
};

export default WorkspaceList;
