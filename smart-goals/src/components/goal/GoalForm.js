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
    const time = new Date();
    const tz = time.getTimezoneOffset() * 60 * 1000;
    const localTimeStamp = time.getTime() - tz;

    const [goalObj, setGoalObj] = useState({
        name: '',
        description: '',
        start_time: localTimeStamp,
        end_time: null,
        completed: false,
        workspace_id: props.wsID,
    });

    const [show, setShow] = useState(false);

    console.log('tx', tz);

    // const [time, setTime] = useState({
    //     start: goalObj.start_time.getTime() - tz,
    //     end: goalObj.end_time ? goalObj.end_time.getTime() - tz : null,
    // });

    const handleChanges = (e) => {
        setGoalObj({
            ...goalObj,
            [e.target.name]: e.target.value,
        });
    };

    const dateChange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        console.log({ start, end });
        // setTime({
        //     ...time,
        //     start: start.getTime() - tz,
        //     end: endDate ? end.getTime() - tz : null,
        // });
        setGoalObj({
            ...goalObj,
            start_time: startDate,
            end_time: endDate,
        });
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
                    startDate={goalObj.start_time}
                    endDate={goalObj.end_time}
                    onChange={dateChange}
                    displayTime
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
