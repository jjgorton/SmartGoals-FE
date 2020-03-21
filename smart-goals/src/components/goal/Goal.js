import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteGoal } from '../../actions/goalActions';

const Goal = props => {
    const dispatch = useDispatch();

    const removeGoal = () => {
        dispatch(deleteGoal(props.goal.id));
    };

    return (
        <div>
            <h6>{props.goal.name}</h6>
            <button onClick={() => removeGoal()}>X</button>
        </div>
    );
};

export default Goal;
