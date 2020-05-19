import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import {
    faPlusSquare,
    faChevronUp,
    faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

import { updateGoal, deleteGoal } from '../../actions/goalActions';

import './goal.scss';
import StepForm from '../step/StepForm';
import Step from '../step/Step';
import ProgressBar from './ProgressBar';

const Goal = ({ goal }) => {
    const dispatch = useDispatch();
    const [newInfo, setNewInfo] = useState({});
    const [noSteps, setNoSteps] = useState(false);
    const [showSteps, setShowSteps] = useState(false);

    const completed = () => {
        dispatch(
            updateGoal({
                id: goal.id,
                completed: !goal.completed,
            })
        );
    };

    const removeGoal = () => {
        dispatch(deleteGoal(goal.id));
    };

    return (
        <div className='goal'>
            <div className='goal-title'>
                <FontAwesomeIcon
                    icon={goal.completed ? faCheckSquare : faSquare}
                    className='done-icon'
                    onClick={() => completed()}
                />
                <h3>{goal.name}</h3>
            </div>
            <ProgressBar goal={goal} />
            {goal.steps && goal.steps.length > 0 ? (
                <div
                    className='show-steps'
                    onClick={() => setShowSteps(!showSteps)}
                >
                    <p>{showSteps ? 'Hide Steps' : 'Show Steps'}</p>
                    <FontAwesomeIcon
                        icon={showSteps ? faChevronUp : faChevronDown}
                        className='show-steps-icon'
                    />
                </div>
            ) : (
                <div className='steps-container'>
                    <StepForm goalID={goal.id} />
                </div>
            )}
            {showSteps && (
                <div className='steps-container'>
                    {goal.steps.map((step) => (
                        <Step info={step} />
                    ))}
                    <StepForm goalID={goal.id} />
                </div>
            )}
        </div>
    );
};

export default Goal;
