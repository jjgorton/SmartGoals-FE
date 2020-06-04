import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

import './stepEdit.scss';

import { updateStep, deleteStep } from '../../actions/goalActions';

const StepForm = ({ step, edit, setEdit }) => {
    const dispatch = useDispatch();
    const [stepObj, setStepObj] = useState({
        name: step.name,
        description: step.description,
        start_time: step.start_time,
        end_time: step.end_time,
        completed: step.completed,
        id: step.id,
        goal_id: step.goal_id,
    });

    const [confirmDel, setConfirmDel] = useState(false);
    const [show, setShow] = useState(true);

    const handleChanges = (e) => {
        setStepObj({
            ...stepObj,
            [e.target.name]: e.target.value,
        });
    };

    const editStep = (e) => {
        e.preventDefault();
        dispatch(updateStep(stepObj));
        setEdit(false);
    };

    const removeStep = () => {
        dispatch(deleteStep(step.goal_id, step.id));
        setConfirmDel(false);
        setEdit(false);
    };

    return (
        <div className='edit-step-container'>
            <form onSubmit={editStep} className='edit-step-form'>
                <div className='step-input'>
                    <FontAwesomeIcon icon={faSquare} className='done-icon' />
                    <div className='input-container'>
                        {/* <label htmlFor='step-name'>Step Name:</label> */}
                        <input
                            type='text'
                            id='step-name'
                            name='name'
                            value={stepObj.name}
                            onChange={handleChanges}
                            required
                            autoFocus
                            maxLength='30'
                            autoComplete='off'
                        />
                    </div>
                </div>
                <div className='edit-step-bottom-container'>
                    <FontAwesomeIcon
                        className='delete-icon'
                        title='Delete Step'
                        icon={faTrashAlt}
                        onClick={() => setConfirmDel(true)}
                    />
                    <span className='screen-reader-only'>Delete Step</span>

                    <div className='btn-container'>
                        <button>Save</button>
                        <button onClick={() => setEdit(false)}>Cancel</button>
                    </div>
                </div>
            </form>
            {confirmDel && (
                <div className='modal-container'>
                    <div className='confirm-delete'>
                        <h3>Delete "{step.name}"?</h3>
                        <p>
                            Tap <span>Delete</span> to permanently remove this
                            step.
                        </p>
                        <div className='new-ws-btns'>
                            <button onClick={() => removeStep()}>Delete</button>
                            <button
                                type='button'
                                onClick={() => setConfirmDel(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StepForm;
