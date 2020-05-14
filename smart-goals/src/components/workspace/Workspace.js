import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import GoalList from '../goal/GoalList';
import GoalForm from '../goal/GoalForm';
import Nav from '../nav/Nav';

import { deleteWorkspace } from '../../actions/workspaceActions';
import { getGoals } from '../../actions/goalActions';

import './workspace.scss';

const Workspace = (props) => {
    const user = useSelector((state) => state.auth);
    const workspaces = useSelector((state) => state.workspaces);
    const dispatch = useDispatch();
    const [ws, setWs] = useState({});
    const [showDesc, setShowDesc] = useState(false);

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

    //adjust displayed length of description
    const desc = () => {
        if (ws.description) {
            let description =
                ws.description.length > 62 && !showDesc
                    ? ws.description.slice(0, 62) + '...'
                    : ws.description;

            return description;
        }
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
        <>
            <Nav
                loggedIn={true}
                center={`Hi, ${user.username}!`}
                back={'/user/workspaces'}
            />
            <div className='ws-container'>
                <header className='ws-header'>
                    {/* <button onClick={() => del()}>Delete Workspace</button> */}

                    <div className='ws-title-container'>
                        <h4 className='ws-name'>{ws.name}</h4>
                        <h5 className='ws-role'>({ws.roles})</h5>
                    </div>
                    <div className='desc-container'>
                        <p className='ws-desc'>
                            {desc()}
                            <span
                                className='show-desc'
                                onClick={() => setShowDesc(!showDesc)}
                            >
                                {ws.description && ws.description.length > 62
                                    ? showDesc
                                        ? 'show less'
                                        : 'show all'
                                    : null}
                            </span>
                        </p>
                    </div>
                </header>
                <GoalForm wsID={props.match.params.id} />
                <GoalList />
            </div>
        </>
    );
};

export default Workspace;
