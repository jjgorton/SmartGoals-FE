import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addWorkspace } from '../../actions/workspaceActions';

const WorkspaceForm = () => {
    const user = useSelector(state => state.auth);
    const workspaces = useSelector(state => state.workspaces);
    const dispatch = useDispatch();
    const [wsObj, setWsObj] = useState({ name: '', description: '' });

    const handleChanges = e => {
        setWsObj({
            ...wsObj,
            [e.target.name]: e.target.value
        });
    };

    const addWS = e => {
        e.preventDefault();
        dispatch(addWorkspace(wsObj));
        setWsObj({ name: '', description: '' });
    };

    return (
        <div>
            <h2>Create a new Workspace</h2>
            <form onSubmit={addWS}>
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
                <label htmlFor='desc'>Workspace Description:</label>
                <textarea
                    type='area'
                    id='desc'
                    name='description'
                    placeholder='Describe the purpose of this workspace'
                    value={wsObj.description}
                    onChange={handleChanges}
                />
                <button>Create</button>
            </form>
        </div>
    );
};

export default WorkspaceForm;
