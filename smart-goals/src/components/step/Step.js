import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './step.scss';

import { updateStep } from '../../actions/goalActions';
import StepEdit from './StepEdit';
import { Draggable } from 'react-beautiful-dnd';

const Step = ({ step, index, checkProgress, setCheckProgress }) => {
    const dispatch = useDispatch();
    const [newInfo, setNewInfo] = useState({});
    const [edit, setEdit] = useState(false);

    const completed = () => {
        dispatch(
            updateStep({
                id: step.id,
                completed: !step.completed,
                goal_id: step.goal_id,
            })
        );
        setCheckProgress(!checkProgress);
    };

    if (edit) return <StepEdit step={step} edit={edit} setEdit={setEdit} />;
    return (
        <Draggable draggableId={`${step.id}step`} index={index}>
            {(provided, snapshot) => (
                <div>
                    <div
                        className='step-container'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <div className='step'>
                            <FontAwesomeIcon
                                icon={step.completed ? faCheckSquare : faSquare}
                                className='done-icon'
                                onClick={() => completed()}
                            />
                            <p>{step.name}</p>
                        </div>
                        <FontAwesomeIcon
                            icon={faPencilAlt}
                            className='edit-icon'
                            onClick={() => setEdit(true)}
                        />
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Draggable>
    );
};

export default Step;
