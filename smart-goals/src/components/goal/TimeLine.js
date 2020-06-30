import React from 'react';
import './timeLine.scss';

const TimeLine = ({ goal }) => {
    const start = new Date(goal.start_time);
    const end = new Date(goal.end_time);
    // const start = goal.start_time;
    // const end = goal.end_time;

    const year = (date) => date.getFullYear();

    const month = (date) =>
        new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);

    const weekDay = (date) =>
        new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);

    const day = (date) => `0${date.getDate()}`.slice(-2);

    const hours = (date) => {
        const hour = date.getHours();
        let baseTwlv = hour < 13 ? hour : hour - 12;
        baseTwlv = hour === 0 ? 12 : baseTwlv;
        //return `0${baseTwlv}`.slice(-2);
        return baseTwlv;
    };

    const minutes = (date) => `0${date.getMinutes()}`.slice(-2);

    const meridian = (date) => (date.getHours() < 11 ? 'AM' : 'PM');

    return (
        <div className='timeline'>
            <div className='start date-time'>
                <div className='date'>
                    <p className='day'>{day(start)}</p>
                    <div className='right-date-container'>
                        <p className='weekday'>{weekDay(start)}</p>
                        <div className='right-bottom-date-container'>
                            <p className='month'>{month(start)}</p>
                            <p className='year'>{year(start)}</p>
                        </div>
                    </div>
                </div>
                <div className='time'>
                    <p className='digit hour'>{hours(start)}</p>
                    <span>:</span>
                    <p className='digit minute'>{minutes(start)}</p>
                    <p className='digit meridian'>{meridian(start)}</p>
                </div>
            </div>
            <div className='now'></div>
            <div className='end date-time'>
                <div className='date'>
                    <p className='day'>{day(end)}</p>
                    <div className='right-date-container'>
                        <p className='weekday'>{weekDay(end)}</p>
                        <div className='right-bottom-date-container'>
                            <p className='month'>{month(end)}</p>
                            <p className='year'>{year(end)}</p>
                        </div>
                    </div>
                </div>
                <div className='time'>
                    <p className='digit hour'>{hours(end)}</p>
                    <span>:</span>
                    <p className='digit minute'>{minutes(end)}</p>
                    <p className='digit meridian'>{meridian(end)}</p>
                </div>
            </div>
        </div>
    );
};

export default TimeLine;
