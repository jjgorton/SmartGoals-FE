import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import Calendar from '@lls/react-light-calendar';
// import '@lls/react-light-calendar/dist/index.css';

import Calendar from '../../utils/react-light-calendar/components/Calendar';
import normalizeRank from '../../utils/normalizeRank/';

import { addGoal, updateGoal } from '../../actions/goalActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

import './goalForm.scss';
// import '../../utils/react-light-calendar/components/calendar.scss';

import ProgressBar from './ProgressBar';

const GoalForm = (props) => {
    const goals = useSelector((state) => state.goals);
    const dispatch = useDispatch();
    const time = new Date();
    const tz = time.getTimezoneOffset() * 60 * 1000;
    const localTimeStamp = time.getTime() - tz;
    const defaultGoalDuration = 7 * 24 * 60 * 60 * 1000;
    const [goalObj, setGoalObj] = useState({
        name: '',
        description: '',
        start_time: localTimeStamp,
        end_time: localTimeStamp + defaultGoalDuration,
        completed: false,
        workspace_id: props.wsID,
    });

    const [progrBarData, setProgrBarData] = useState({
        ...goalObj,
        steps: [],
    });

    const [show, setShow] = useState(false);
    const [addDesc, setAddDesc] = useState(false);

    const useFocus = () => {
        const elRef = useRef(null);
        const setFocus = () => elRef.current && elRef.current.focus();
        console.log('focus hook called for', elRef);
        return [elRef, setFocus];
    };

    const [inputRef, setInputFocus] = useFocus();

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
        const start = new Date(startDate + tz);
        const end = new Date(endDate + tz);
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
        const newGoalObj = {
            ...goalObj,
            start_time: new Date(goalObj.start_time + tz),
            end_time: new Date(goalObj.end_time + tz),
        };

        //add new goal ranked at end of list, if normalization was needed, then update all with new ranks
        const ranked = normalizeRank(
            [...goals.list, newGoalObj],
            goals.list.length
        );

        Promise.all(
            ranked.map((obj, i) => {
                if (ranked.length > 1 && i !== ranked.length - 1) {
                    return dispatch(updateGoal(obj));
                }

                return dispatch(addGoal(obj));
            })
        );

        setShow(!show);
        setGoalObj({
            name: '',
            description: '',
            start_time: localTimeStamp,
            end_time: localTimeStamp + defaultGoalDuration,
            completed: false,
            workspace_id: props.wsID,
        });
    };

    const cancel = () => {
        setShow(!show);
        setGoalObj({
            name: '',
            description: '',
            start_time: localTimeStamp,
            end_time: localTimeStamp + defaultGoalDuration,
            completed: false,
            workspace_id: props.wsID,
        });
    };

    return (
        <div className={show ? 'new-goal grow' : 'new-goal'}>
            <form className='goal-form' onSubmit={newGoal}>
                {!show && (
                    <div
                        className='new-goal-button'
                        onClick={() => {
                            setShow(!show);
                            setInputFocus();
                            console.log('onclick called');
                        }}
                        // onClick={setInputFocus}
                    >
                        <FontAwesomeIcon
                            icon={faPlusSquare}
                            className='add-goal-icon'
                        />
                        <p>Start a new Goal</p>
                    </div>
                )}
                {show && (
                    <div className='goal-title'>
                        <FontAwesomeIcon
                            icon={faSquare}
                            className='goal-icon'
                        />
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={goalObj.name}
                            onChange={handleChanges}
                            required
                            // ref={inputRef}
                            autoFocus
                            maxLength='20'
                            autoComplete='off'
                        />
                    </div>
                )}
                {/* <p onClick={() => setAddDesc(!addDesc)}>
                    {!addDesc ? 'Add a descripton' : "Don't add a description"}
                </p>
                <textarea
                    id='desc'
                    name='description'
                    placeholder='describe your goal here...'
                    value={goalObj.description}
                    onChange={handleChanges}
                    maxLength='500'
                    className={!addDesc ? 'goal-desc' : 'goal-desc expand'}
                /> */}
                <textarea
                    id='desc'
                    name='description'
                    placeholder='describe your goal here...'
                    value={goalObj.description}
                    onChange={handleChanges}
                    maxLength='500'
                    className='goal-desc'
                />
                <ProgressBar goal={progrBarData} />
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
