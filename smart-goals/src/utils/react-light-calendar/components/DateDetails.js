import React, { Component } from 'react';
import { formartTime } from '../utils';
import times from 'lodash.times';
import { bool, arrayOf, string, number, func } from 'prop-types';
import t from 'timestamp-utils';

class DateDetails extends Component {
    constructor(props) {
        super(props);
        const { date } = this.props;
        const cT = new Date();
        const hours = cT.getHours();
        console.log('consdtr', hours);
        this.state = {
            hours: hours < 13 ? hours : hours - 12,
            minutes: new Date().getMinutes(),
            meridian: new Date().getHours() < 11 ? 'AM' : 'PM',
            time: '12:32',
        };
    }

    setTime = (e) => {
        console.log(e.target.value);
    };

    onHoursChange = (e) => {
        const { date, onTimeChange } = this.props;
        this.setState({
            ...this.state,
            hours: e.target.value,
        });
        let milTime = 0;
        if (this.state.meridian === 'PM' && e.target.value < 12) {
            milTime = 12;
            console.log('pm', this.state.meridian, milTime);
        }
        if (this.state.meridian === 'AM' && e.target.value == 12) {
            milTime = -12;
            console.log('am', this.state.meridian, milTime);
        }
        let tzOffSet = new Date().getTimezoneOffset() / 60;
        e.target.value &&
            onTimeChange(
                t.setHours(
                    date,
                    parseInt(e.target.value, 10) + milTime + tzOffSet
                )
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

    onMeridianChange = (e) => {
        this.setState({
            ...this.state,
            meridian: e.target.value,
        });
        this.updateMeridianHours(e.target.value);
    };

    updateMeridianHours = function (meridian) {
        console.log('meridian', this.state.meridian, meridian);
        const { date, onTimeChange } = this.props;

        let milTime = 0;
        if (meridian === 'PM' && this.state.hours < 12) {
            milTime = 12;
        }
        if (meridian === 'AM' && this.state.hours == 12) {
            milTime = -12;
        }
        console.log('mil', milTime, this.state.hours);
        let tzOffSet = new Date().getTimezoneOffset() / 60;
        this.state.hours &&
            onTimeChange(
                t.setHours(
                    date,
                    parseInt(this.state.hours, 10) + milTime + tzOffSet
                )
            );
    };

    render = () => {
        const { date, displayTime, dayLabels, monthLabels } = this.props;
        const hours = t.getHours(date);
        const minutes = t.getMinutes(date);
        // console.log('hours', parseInt(this.state.hours, 10));
        // console.log(this.state);

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
                        {/* <input
                            type='time'
                            name='hours'
                            value={formartTime(this.state.hours)}
                            onChange={this.onHoursChange}
                            max='12'
                            min='1'
                            maxLength='2'
                        />
                        <span className='rlc-time-separator'>:</span> */}
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
                        {/* <input
                            type='number'
                            name='minutes'
                            value={formartTime(this.state.minutes)}
                            onChange={this.onMinutesChange}
                            max='59'
                            min='00'
                            maxLength='2'
                        />
                        <select
                            name='meridian'
                            value={this.state.meridian}
                            onChange={this.onMeridianChange}
                        >
                            <option value='AM'>AM</option>
                            <option value='PM'>PM</option>
                        </select> */}
                        <input
                            type='time'
                            name='time'
                            // value={this.state.time}
                            onChange={this.setTime}
                        />
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
