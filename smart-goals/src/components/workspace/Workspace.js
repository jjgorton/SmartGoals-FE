import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import GoalList from '../goal/GoalList';

import { deleteWorkspace } from '../../actions/workspaceActions';
import { getGoals } from '../../actions/goalActions';

const Workspace = props => {
    const workspaces = useSelector(state => state.workspaces);
    const dispatch = useDispatch();
    const [ws, setWs] = useState({});

    useEffect(() => {
        setWs(
            workspaces.list.find(data => {
                return data.workspace_id == props.match.params.id;
            })
        );
    }, [workspaces]);

    useEffect(() => {
        dispatch(getGoals(props.match.params.id));
    }, []);

    const del = e => {
        dispatch(deleteWorkspace(props.match.params.id))
            .then(res => {
                props.history.push('/user/workspaces');
            })
            .catch(err => console.log(err));
    };

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
            <button onClick={() => del()}>Delete Workspace</button>
            <h4>{ws.name}</h4>
            <h5>{ws.roles}</h5>
            <p>{ws.description}</p>
            <p>{ws.created_at}</p>
            <GoalList />
        </div>
    );
};

export default Workspace;
