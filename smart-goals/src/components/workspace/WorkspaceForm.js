import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addWorkspace } from '../../actions/workspaceActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import './workspaceForm.scss';

const WorkspaceForm = () => {
    const user = useSelector((state) => state.auth);
    const workspaces = useSelector((state) => state.workspaces);
    const dispatch = useDispatch();
    const [wsObj, setWsObj] = useState({ name: '', description: '' });
    const [show, setShow] = useState(false);

    const handleChanges = (e) => {
        setWsObj({
            ...wsObj,
            [e.target.name]: e.target.value,
        });
    };

    const addWS = (e) => {
        e.preventDefault();
        dispatch(addWorkspace(wsObj));
        setWsObj({ name: '', description: '' });
        setShow(!show);
    };

    const cancel = () => {
        setShow(!show);
        setWsObj({ name: '', description: '' });
    };

    return (
        <div className='new-ws'>
            <div className='new-ws-button'>
                <FontAwesomeIcon
                    icon={faPlusSquare}
                    className='add-ws-icon'
                    onClick={() => setShow(!show)}
                />
                {/* <label htmlFor='new-ws'>Create a new Workspace</label> */}
            </div>
            <div
                className={
                    show ? 'ws-form-container show' : 'ws-form-container hide'
                }
            >
                <form
                    className={show ? 'ws-form show' : 'ws-form hide'}
                    onSubmit={addWS}
                >
                    <div className='input-container'>
                        <label htmlFor='name'>Workspace Name:</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            placeholder='Name your new workspace'
                            value={wsObj.name}
                            onChange={handleChanges}
                            required
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='desc'>Workspace Description:</label>
                        <textarea
                            type='area'
                            id='desc'
                            name='description'
                            placeholder='Describe the purpose of this workspace'
                            value={wsObj.description}
                            onChange={handleChanges}
                        />
                    </div>
                    <div className='new-ws-btns'>
                        <button>Create</button>
                        <button type='button' onClick={() => cancel()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WorkspaceForm;
