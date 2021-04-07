import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

import './stepForm.scss';

import { addStep, updateStep } from '../../actions/goalActions';
import normalizeRank from '../../utils/normalizeRank/';

const StepForm = (props) => {
    const dispatch = useDispatch();
    const [stepObj, setStepObj] = useState({
        name: '',
        description: '',
        start_time: null,
        end_time: null,
        completed: false,
        goal_id: props.goalID,
    });

    const [show, setShow] = useState(true);

    const handleChanges = (e) => {
        setStepObj({
            ...stepObj,
            [e.target.name]: e.target.value,
        });
    };

    const newStep = (e) => {
        e.preventDefault();
        setShow(!show);

        //add new step ranked at end of list, if normalization was needed, then update all with new ranks
        const ranked = normalizeRank(
            [...props.goal.steps, stepObj],
            props.goal.steps.length
        );

        Promise.all(
            ranked.map((obj, i) => {
                if (ranked.length > 1 && i !== ranked.length - 1) {
                    return dispatch(updateStep(obj));
                }

                return dispatch(addStep(obj));
            })
        );

        setStepObj({
            name: '',
            description: '',
            start_time: null,
            end_time: null,
            completed: false,
            goal_id: props.goalID,
        });
    };

    return (
        <div>
            {show ? (
                <div className='add-steps' onClick={() => setShow(!show)}>
                    <FontAwesomeIcon
                        icon={faPlusSquare}
                        className='add-step-icon'
                    />
                    <p>Add a Step</p>
                </div>
            ) : (
                <form onSubmit={newStep} className='step-form'>
                    <div className='step-input'>
                        <FontAwesomeIcon
                            icon={faSquare}
                            className='done-icon'
                        />
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
                                autocomplete='off'
                            />
                        </div>
                    </div>
                    <div className='btn-container'>
                        <button>Save</button>
                        <button onClick={() => setShow(!show)}>Cancel</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default StepForm;
