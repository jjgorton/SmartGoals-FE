import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateRangePicker } from 'react-date-range';
import { InputMoment } from 'input-moment';
import moment from 'moment';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { addGoal } from '../../actions/goalActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

import './goalForm.scss';

const GoalForm = (props) => {
    const goals = useSelector((state) => state.goals);
    const dispatch = useDispatch();
    const [goalObj, setGoalObj] = useState({
        name: '',
        description: '',
        est_time: null,
        due: null,
        completed: false,
        workspace_id: props.wsID,
    });

    const [show, setShow] = useState(false);
    // const [m, setM] = useState({ m: 'moment()' });

    const handleChanges = (e) => {
        setGoalObj({
            ...goalObj,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelect = (m) => {
        console.log(m);
        // setSelectionRange({
        //     startDate: ranges.selection.startDate,
        //     endDate: ranges.selection.endDate,
        //     key: 'selection',
        // });
    };

    const newGoal = (e) => {
        e.preventDefault();
        dispatch(addGoal(goalObj));
        setShow(!show);
        setGoalObj({
            name: '',
            description: '',
            est_time: null,
            due: null,
            completed: false,
            workspace_id: props.wsID,
        });
    };

    const cancel = () => {
        setShow(!show);
        setGoalObj({
            name: '',
            description: '',
            est_time: null,
            due: null,
            completed: false,
            workspace_id: props.wsID,
        });
    };

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    return (
        <div className='new-goal'>
            <div
                className={!show ? 'new-goal-button' : 'hide'}
                onClick={() => setShow(!show)}
            >
                <FontAwesomeIcon
                    icon={faPlusSquare}
                    className='add-goal-icon'
                />
                <p>Start a new Goal</p>
            </div>
            <form
                className={show ? 'goal-form show' : 'goal-form hide'}
                onSubmit={newGoal}
            >
                {/* <label htmlFor='name'>Goal Title: </label> */}
                <div className='goal-title'>
                    <FontAwesomeIcon icon={faSquare} className='goal-icon' />
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={goalObj.name}
                        onChange={handleChanges}
                        required
                        autoFocus
                        maxLength='20'
                        autoComplete='off'
                    />
                </div>
                {/* <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    dateDisplayFormat='MM d, yyyy hh:mm a..aaa'
                /> */}
                {/* <InputMoment onChange={handleSelect} /> */}
                {/* <label htmlFor='desc'>Goal Description:</label>
                <textarea
                    type='area'
                    id='desc'
                    name='description'
                    placeholder='Describe what you want to achieve'
                    value={goalObj.description}
                    onChange={handleChanges}
                /> */}

                <div className='new-ws-btns'>
                    <button>Create</button>
                    <button type='button' onClick={() => cancel()}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GoalForm;
