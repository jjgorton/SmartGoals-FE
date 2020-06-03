import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import Calendar from '@lls/react-light-calendar';
// import '@lls/react-light-calendar/dist/index.css';

import Calendar from '../../utils/react-light-calendar/components/Calendar';

import { addGoal } from '../../actions/goalActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

import './goalForm.scss';
// import '../../utils/react-light-calendar/components/calendar.scss';

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

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(tz);

    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: '',
    });

    const handleChanges = (e) => {
        setGoalObj({
            ...goalObj,
            [e.target.name]: e.target.value,
        });
    };

    const dateChange = (startDate, endDate) => {
        const start = new Date(startDate).toUTCString();
        // const startTZ = new Date(
        //     start.UTC() + start.getTimezoneOffset() * 60 * 1000
        // ).toString();
        const end = new Date(endDate).toString();
        console.log({ start, end });
        setDate({ startDate, endDate });
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
                <Calendar
                    startDate={date.startDate}
                    endDate={date.endDate}
                    onChange={dateChange}
                    range={false}
                    displayTime
                    // timezone='EDT'
                    // timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}
                />

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
