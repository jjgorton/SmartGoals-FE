import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addGoal } from '../../actions/goalActions';

// currently inheriting from workspaceForm.scss
import './goalForm.scss';

const GoalForm = (props) => {
    const goals = useSelector((state) => state.goals);
    const dispatch = useDispatch();
    const [goalObj, setGoalObj] = useState({
        name: '',
        description: '',
        est_time: null,
        due: null,
        completed: false,
        workspace_id: props.wsID,
    });

    const [show, setShow] = useState(false);

    const handleChanges = (e) => {
        setGoalObj({
            ...goalObj,
            [e.target.name]: e.target.value,
        });
    };

    const newGoal = (e) => {
        e.preventDefault();
        dispatch(addGoal(goalObj));
        setGoalObj({
            name: '',
            description: '',
            est_time: null,
            due: null,
            completed: false,
            workspace_id: props.wsID,
        });
    };

    const cancel = () => {
        setShow(!show);
        setGoalObj({
            name: '',
            description: '',
            est_time: null,
            due: null,
            completed: false,
            workspace_id: props.wsID,
        });
    };

    return (
        <div className='new-ws'>
            <div className='new-ws-button'>
                <button id='new-ws' onClick={() => setShow(!show)}>
                    {show ? '-' : '+'}
                </button>
                <label htmlFor='new-ws'>Start a new Goal</label>
            </div>
            <form
                className={show ? 'ws-form show' : 'ws-form hide'}
                onSubmit={newGoal}
            >
                <label htmlFor='name'>Goal Title: </label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder="Enter Goal's title here"
                    value={goalObj.name}
                    onChange={handleChanges}
                    required
                />
                <label htmlFor='desc'>Goal Description:</label>
                <textarea
                    type='area'
                    id='desc'
                    name='description'
                    placeholder='Describe what you want to achieve'
                    value={goalObj.description}
                    onChange={handleChanges}
                />

                <div className='new-ws-btns'>
                    <button>Create</button>
                    <button type='button' onClick={() => cancel()}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GoalForm;
