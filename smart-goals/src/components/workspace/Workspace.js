import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { getWorkspaces } from '../../actions/workspaceActions';

const Workspace = props => {
    const userID = localStorage.getItem('userID');
    const workspaces = useSelector(state => state.workspaces);
    const dispatch = useDispatch();
    const [ws, setWs] = useState({});

    // complete redux state not persisted so may need to do another http req. instead to handle refreshes
    // const ws = workspaces.list.find(data => {
    //     return data.workspace_id == props.match.params.id;
    // });

    useEffect(() => {
        setWs(
            workspaces.list.find(data => {
                return data.workspace_id == props.match.params.id;
            })
        );
        // dispatch(getWorkspaces(userID));
    }, [workspaces]);
    console.log(ws);
    if (!ws || workspaces.loading) {
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
        <div>
            <h1>Workspace Info and Goal Lists here</h1>
            <h4>{ws.name}</h4>
            <h5>{ws.roles}</h5>
            <p>{ws.description}</p>
            <p>{ws.created_at}</p>
        </div>
    );
};

export default Workspace;
