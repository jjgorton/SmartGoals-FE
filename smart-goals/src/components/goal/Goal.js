import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

import { updateGoal, deleteGoal } from '../../actions/goalActions';

import './goal.scss';
import StepForm from '../step/StepForm';
import Step from '../step/Step';

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
            <div className='goal-title'>
                <FontAwesomeIcon
                    icon={props.goal.completed ? faCheckSquare : faSquare}
                    className='done-icon'
                    onClick={() => completed()}
                />
                <h3>{props.goal.name}</h3>
            </div>
            <div className='steps-container'>
                {props.goal.steps &&
                    props.goal.steps.map((step) => <Step info={step} />)}
                <StepForm goalID={props.goal.id} />
            </div>
        </div>
    );
};

export default Goal;
