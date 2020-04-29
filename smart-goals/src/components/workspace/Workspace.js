import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import GoalList from '../goal/GoalList';
import GoalForm from '../goal/GoalForm';

import { deleteWorkspace } from '../../actions/workspaceActions';
import { getGoals } from '../../actions/goalActions';

import './workspace.scss';

const Workspace = (props) => {
    const workspaces = useSelector((state) => state.workspaces);
    const dispatch = useDispatch();
    const [ws, setWs] = useState({});

    useEffect(() => {
        setWs(
            workspaces.list.find((data) => {
                return data.workspace_id == props.match.params.id;
            })
        );
    }, [workspaces]);

    useEffect(() => {
        dispatch(getGoals(props.match.params.id));
    }, []);

    const del = (e) => {
        dispatch(deleteWorkspace(props.match.params.id))
            .then((res) => {
                props.history.push('/user/workspaces');
            })
            .catch((err) => console.log(err));
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
        <div className='ws-container'>
            <header className='ws-header'>
                {/* <button onClick={() => del()}>Delete Workspace</button> */}
                <Link to='/user/workspaces' className='back-container'>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className='back-icon'
                        // onClick={() => toWorkspacesList()}
                    />
                    <p className='back-title'>Workspaces</p>
                </Link>
                <div className='ws-title-container'>
                    <h4 className='ws-name'>{ws.name}</h4>
                    <h5 className='ws-role'>({ws.roles})</h5>
                </div>
                <p className='ws-desc'>{ws.description}</p>
            </header>
            <GoalForm wsID={props.match.params.id} />
            <GoalList />
        </div>
    );
};

export default Workspace;
