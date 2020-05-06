import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

import './step.scss';

import { updateStep } from '../../actions/goalActions';

const Step = ({ info }) => {
    const dispatch = useDispatch();
    const [newInfo, setNewInfo] = useState({});

    const completed = () => {
        dispatch(
            updateStep({
                id: info.id,
                completed: !info.completed,
                goal_id: info.goal_id,
            })
        );
    };

    return (
        <>
            <div className='step'>
                <FontAwesomeIcon
                    icon={info.completed ? faCheckSquare : faSquare}
                    className='done-icon'
                    onClick={() => completed()}
                />
                <p>{info.name}</p>
            </div>
        </>
    );
};

export default Step;
