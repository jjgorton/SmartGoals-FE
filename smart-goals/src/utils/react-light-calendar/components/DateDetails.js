import React, { Component } from 'react';
import { formartTime } from '../utils';
import times from 'lodash.times';
import { bool, arrayOf, string, number, func } from 'prop-types';
import t from 'timestamp-utils';

class DateDetails extends Component {
    constructor() {
        super();
        this.state = {
            hours: '12',
            minutes: '00',
            meridian: 'PM',
        };
    }

    onHoursChange = (e) => {
        const { date, onTimeChange } = this.props;
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
        let milTime = this.state.meridian === 'PM' ? 12 : 0;

        this.state.hours &&
            onTimeChange(
                t.setHours(date, parseInt(this.state.hours, 10) + milTime)
            );
    };

    onMinutesChange = (e) => {
        const { date, onTimeChange } = this.props;
        // let digits =
        //     e.target.value.length < 2 ? '0' + e.target.value : e.target.value;
        this.setState({
            ...this.state,
            minutes: e.target.value,
        });
        e.target.value &&
            onTimeChange(t.setMinutes(date, parseInt(e.target.value, 10)));
    };

    render = () => {
        const { date, displayTime, dayLabels, monthLabels } = this.props;
        const hours = t.getHours(date);
        const minutes = t.getMinutes(date);
        console.log('hours', parseInt(this.state.hours, 10));
        console.log(this.state);

        return (
            <div className='rlc-date-details-wrapper'>
                <div className='rlc-date-details'>
                    <div className='rlc-date-number'>{t.getDay(date)}</div>
                    <div className='rlc-date-day-month-year'>
                        <div className='rlc-detail-day'>
                            {dayLabels[t.getWeekDay(date)]}
                        </div>
                        <div className='rlc-detail-month-year'>
                            {monthLabels[t.getMonth(date) - 1]}{' '}
                            <span className='rlc-detail-year'>
                                {t.getYear(date)}
                            </span>
                        </div>
                    </div>
                </div>
                {displayTime && (
                    <div className='rlc-date-time-selects'>
                        {/* <select onChange={this.onHoursChange} value={hours}>{times(24).map(hour => <option value={formartTime(hour)} key={hour}>{formartTime(hour)}</option>)}</select> */}
                        <input
                            type='number'
                            name='hours'
                            value={this.state.hours}
                            onChange={this.onHoursChange}
                        />
                        <span className='rlc-time-separator'>:</span>
                        {/* <select onChange={this.onMinutesChange} value={minutes}>
                            {times(60).map((minute) => (
                                <option
                                    value={formartTime(minute)}
                                    key={minute}
                                >
                                    {formartTime(minute)}
                                </option>
                            ))}
                        </select> */}
                        <input
                            type='number'
                            name='minutes'
                            value={this.state.minutes}
                            onChange={this.onMinutesChange}
                        />
                        <select
                            name='meridian'
                            value={this.state.meridian}
                            onChange={this.onHoursChange}
                        >
                            <option value='AM'>AM</option>
                            <option value='PM'>PM</option>
                        </select>
                    </div>
                )}
            </div>
        );
    };
}

DateDetails.propTypes = {
    date: number,
    displayTime: bool,
    dayLabels: arrayOf(string),
    monthLabels: arrayOf(string),
    onTimeChange: func,
};

export default DateDetails;
