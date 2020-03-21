import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addGoal } from '../../actions/goalActions';

const GoalForm = props => {
    const goals = useSelector(state => state.goals);
    const dispatch = useDispatch();
    const [goalObj, setGoalObj] = useState({
        name: '',
        description: '',
        est_time: 0,
        due: '',
        completed: false,
        workspace_id: props.wsID
    });

    const handleChanges = e => {
        setGoalObj({
            ...goalObj,
            [e.target.name]: e.target.value
        });
    };

    const newGoal = e => {
        e.preventDefault();
        dispatch(addGoal(goalObj));
        setGoalObj({
            name: '',
            description: '',
            est_time: 0,
            due: '',
            completed: false,
            workspace_id: props.wsID
        });
    };

    return (
        <div>
            <h3>Create a new Goal</h3>
            <form onSubmit={newGoal}>
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

                <button>Create</button>
            </form>
        </div>
    );
};

export default GoalForm;
