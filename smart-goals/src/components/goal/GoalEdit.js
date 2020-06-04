import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import Calendar from '@lls/react-light-calendar';
// import '@lls/react-light-calendar/dist/index.css';

import Calendar from '../../utils/react-light-calendar/components/Calendar';

import { updateGoal, deleteGoal } from '../../actions/goalActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

import './goalEdit.scss';
import Goal from './Goal';
// import '../../utils/react-light-calendar/components/calendar.scss';

const GoalForm = ({ goal, edit, setEdit }) => {
    const goals = useSelector((state) => state.goals);
    const dispatch = useDispatch();
    const time = new Date();
    const tz = time.getTimezoneOffset() * 60 * 1000;
    const localTimeStamp = time.getTime() - tz;

    const [goalObj, setGoalObj] = useState({
        name: goal.name,
        description: goal.description,
        start_time: goal.start_time,
        end_time: goal.end_time,
        completed: goal.completed,
        id: goal.id,
    });

    const [confirmDel, setConfirmDel] = useState(false);

    // const [show, setShow] = useState(false);

    // console.log('tx', tz);

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

    const editGoal = (e) => {
        e.preventDefault();
        dispatch(updateGoal(goalObj));
        setEdit(false);
    };

    const removeGoal = () => {
        dispatch(deleteGoal(goal.id));
        setConfirmDel(false);
        setEdit(false);
    };

    const cancel = () => {
        setEdit(false);
    };

    return (
        <div className='edit-goal'>
            <form className='goal-form' onSubmit={editGoal}>
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
                {/* <Calendar
                    startDate={goalObj.start_time}
                    endDate={goalObj.end_time}
                    onChange={dateChange}
                    displayTime
                /> */}

                <div className='edit-goal-bottom-container'>
                    <FontAwesomeIcon
                        className='delete-icon'
                        title='Delete Goal'
                        icon={faTrashAlt}
                        onClick={() => setConfirmDel(true)}
                    />
                    <span className='screen-reader-only'>Delete Goal</span>

                    <div className='new-ws-btns'>
                        <button>Update</button>
                        <button type='button' onClick={() => cancel()}>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
            {confirmDel && (
                <div className='modal-container'>
                    <div className='confirm-delete'>
                        <h3>Delete "{goal.name}"?</h3>
                        <p>
                            Tap <span>Delete</span> to permanently remove this
                            goal along with all steps and progress for this
                            goal.
                        </p>
                        <div className='new-ws-btns'>
                            <button onClick={() => removeGoal()}>Delete</button>
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

export default GoalForm;
