import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import {
    faPlusSquare,
    faChevronUp,
    faChevronDown,
    faPencilAlt,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

import { updateGoal, deleteGoal } from '../../actions/goalActions';

import './goal.scss';
import StepForm from '../step/StepForm';
import Step from '../step/Step';
import ProgressBar from './ProgressBar';
import GoalEdit from './GoalEdit';

const Goal = ({ goal }) => {
    const dispatch = useDispatch();
    const [newInfo, setNewInfo] = useState({});
    const [noSteps, setNoSteps] = useState(false);
    const [showSteps, setShowSteps] = useState(false);
    const [error, setError] = useState('');
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const allStepsDone =
            goal.steps.length && goal.steps.every((step) => step.completed);
        if (allStepsDone && !goal.completed) completed();
        else if (!allStepsDone && goal.completed) completed();
    }, [goal.steps, goal.steps.length]);

    const completed = () => {
        dispatch(
            updateGoal({
                id: goal.id,
                completed: !goal.completed,
            })
        );
    };

    const check = () => {
        if (goal.steps.length && !goal.steps.every((step) => step.completed)) {
            setError('Please complete all steps.');
            setShowSteps(true);
            setTimeout(() => setError(''), 5000);
        } else if (
            goal.steps.length &&
            goal.steps.every((step) => step.completed)
        ) {
            setError(
                'All steps are complete.  You can add additional steps below.'
            );
            setShowSteps(true);
            setTimeout(() => setError(''), 5000);
        } else {
            completed();
        }
    };

    if (edit) return <GoalEdit goal={goal} edit={edit} setEdit={setEdit} />;
    return (
        <div className='goal'>
            <div className='goal-top-line'>
                <div className='goal-title'>
                    <FontAwesomeIcon
                        icon={goal.completed ? faCheckSquare : faSquare}
                        className='done-icon'
                        onClick={() => check()}
                    />
                    <h3>{goal.name}</h3>
                </div>
                <FontAwesomeIcon
                    icon={faPencilAlt}
                    className='edit-icon'
                    onClick={() => setEdit(true)}
                />
            </div>
            <div className={error ? 'error-container' : 'hide'}>
                <p className='goal-error'>{error}</p>
            </div>
            <ProgressBar goal={goal} />
            {goal.steps.length > 0 ? (
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
            {showSteps && goal.steps.length > 0 && (
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
