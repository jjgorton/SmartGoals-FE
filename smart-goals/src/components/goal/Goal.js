import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Draggable } from 'react-beautiful-dnd';

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
import TimeLine from './TimeLine';

import { Droppable } from 'react-beautiful-dnd';

const Goal = ({ goal, index }) => {
    const dispatch = useDispatch();
    const [checkProgress, setCheckProgress] = useState(false);
    const [showSteps, setShowSteps] = useState(false);
    const [showDesc, setShowDesc] = useState(false);
    const [error, setError] = useState('');
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const allStepsDone =
            goal.steps.length && goal.steps.every((step) => step.completed);
        if (allStepsDone && !goal.completed) completed();
        else if (!allStepsDone && allStepsDone !== 0 && goal.completed)
            completed();
    }, [checkProgress, goal.steps, goal.steps.length]);

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

    //adjust displayed length of description
    const desc = () => {
        if (goal.description) {
            let description =
                goal.description.length > 62 && !showDesc
                    ? goal.description.slice(0, 62) + '...'
                    : goal.description;

            return description;
        }
    };

    if (edit) return <GoalEdit goal={goal} edit={edit} setEdit={setEdit} />;
    return (
        <Draggable draggableId={`${goal.id}`} index={index}>
            {(provided, snapshot) => (
                <div
                    className='goal'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    // {...provided.dragHandleProps}
                >
                    <div {...provided.dragHandleProps}>
                        <div className='goal-top-line'>
                            <div className='goal-title'>
                                <FontAwesomeIcon
                                    icon={
                                        goal.completed
                                            ? faCheckSquare
                                            : faSquare
                                    }
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
                        <p className='goal-desc'>
                            {desc()}
                            <span
                                className='show-desc'
                                onClick={() => setShowDesc(!showDesc)}>
                                {goal.description &&
                                goal.description.length > 62
                                    ? showDesc
                                        ? 'show less'
                                        : 'show all'
                                    : null}
                            </span>
                        </p>
                        <ProgressBar
                            goal={goal}
                            checkProgress={checkProgress}
                        />
                        <TimeLine goal={goal} />
                    </div>
                    {goal.steps.length > 0 ? (
                        <div
                            className='show-steps'
                            onClick={() => setShowSteps(!showSteps)}>
                            <p>{showSteps ? 'Hide Steps' : 'Show Steps'}</p>
                            <FontAwesomeIcon
                                icon={showSteps ? faChevronUp : faChevronDown}
                                className='show-steps-icon'
                            />
                        </div>
                    ) : (
                        <div className='steps-container'>
                            <StepForm
                                goalID={goal.id}
                                goal={goal}
                                setShowSteps={setShowSteps}
                            />
                        </div>
                    )}
                    {showSteps && goal.steps.length > 0 && (
                        <Droppable
                            droppableId={`${goal.id}steps`}
                            type={`${index}steps`}>
                            {(provided, snapshot) => (
                                <div
                                    className='steps-container'
                                    ref={provided.innerRef}>
                                    {goal.steps
                                        .sort((a, b) => a.rank - b.rank)
                                        .map((step, i) => (
                                            <Step
                                                key={step.id}
                                                index={i}
                                                step={step}
                                                checkProgress={checkProgress}
                                                setCheckProgress={
                                                    setCheckProgress
                                                }
                                            />
                                        ))}
                                    {provided.placeholder}
                                    <StepForm
                                        goalID={goal.id}
                                        goal={goal}
                                        setShowSteps={setShowSteps}
                                    />
                                </div>
                            )}
                        </Droppable>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default Goal;
