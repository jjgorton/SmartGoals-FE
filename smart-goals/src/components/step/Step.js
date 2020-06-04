import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './step.scss';

import { updateStep } from '../../actions/goalActions';
import StepEdit from './StepEdit';

const Step = ({ info }) => {
    const dispatch = useDispatch();
    const [newInfo, setNewInfo] = useState({});
    const [edit, setEdit] = useState(false);

    const completed = () => {
        dispatch(
            updateStep({
                id: info.id,
                completed: !info.completed,
                goal_id: info.goal_id,
            })
        );
    };

    if (edit) return <StepEdit step={info} edit={edit} setEdit={setEdit} />;
    return (
        <div className='step-container'>
            <div className='step'>
                <FontAwesomeIcon
                    icon={info.completed ? faCheckSquare : faSquare}
                    className='done-icon'
                    onClick={() => completed()}
                />
                <p>{info.name}</p>
            </div>
            <FontAwesomeIcon
                icon={faPencilAlt}
                className='edit-icon'
                onClick={() => setEdit(true)}
            />
        </div>
    );
};

export default Step;
