import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

import { updateGoal, deleteGoal } from '../../actions/goalActions';

import './goal.scss';

const Goal = (props) => {
    const dispatch = useDispatch();
    const [newInfo, setNewInfo] = useState({});
    const [done, setDone] = useState(false);

    const completed = () => {
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
        <div className='goal'>
            <FontAwesomeIcon
                icon={props.goal.completed ? faCheckSquare : faSquare}
                className='done-icon'
                onClick={() => completed()}
            />
            <h3>{props.goal.name}</h3>
        </div>
    );
};

export default Goal;
