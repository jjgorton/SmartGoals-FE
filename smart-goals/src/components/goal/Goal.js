import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateGoal, deleteGoal } from '../../actions/goalActions';

import './goal.scss';

const Goal = (props) => {
    const dispatch = useDispatch();
    const [newInfo, setNewInfo] = useState({});
    const [done, setDone] = useState(false);

    const completed = (e) => {
        e.preventDefault();
        setDone(!done);
        dispatch(
            updateGoal({
                id: props.goal.id,
                completed: !props.goal.completed,
            })
        );
    };

    const removeGoal = () => {
        dispatch(deleteGoal(props.goal.id));
    };

    return (
        <div>
            <h3>{props.goal.name}</h3>
            {props.goal.completed && <p>Completed</p>}
            <button onClick={(e) => completed(e)}>Done</button>
            <button onClick={() => removeGoal()}>X</button>
        </div>
    );
};

export default Goal;
