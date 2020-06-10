import React, { Component } from 'react';
import { formartTime } from '../utils';
import times from 'lodash.times';
import { bool, arrayOf, string, number, func } from 'prop-types';
import t from 'timestamp-utils';

class DateDetails extends Component {
    constructor(props) {
        super(props);
        const { date } = this.props;
        const defaulTime = new Date(date);
        const hours = defaulTime.getUTCHours();
        let baseTwlv = hours < 13 ? hours : hours - 12;
        baseTwlv = hours === 0 ? 12 : baseTwlv;

        this.state = {
            hours: formartTime(baseTwlv),
            minutes: formartTime(defaulTime.getUTCMinutes()),
            meridian: defaulTime.getUTCHours() < 11 ? 'AM' : 'PM',
            defaulTime: defaulTime,
        };
    }
    componentDidMount = () => {
        const { date, onTimeChange } = this.props;

        onTimeChange(
            t.set(date, {
                hours: this.state.defaulTime.getUTCHours(),
                minutes: this.state.defaulTime.getUTCMinutes(),
            })
        );
    };

    onHoursChange = (e) => {
        const { date, onTimeChange } = this.props;

        let val = formartTime(e.target.value);
        val = parseInt(val) > 12 ? '' : val;

        this.setState({
            ...this.state,
            hours: val,
        });
        let milTime = 0;
        if (this.state.meridian === 'PM' && val < 12) {
            milTime = 12;
        }
        if (this.state.meridian === 'AM' && val == 12) {
            milTime = -12;
        }

        val && onTimeChange(t.setHours(date, parseInt(val, 10) + milTime));
    };

    onMinutesChange = (e) => {
        const { date, onTimeChange } = this.props;

        let val = formartTime(e.target.value);
        val = parseInt(val) > 59 ? '' : val;

        this.setState({
            ...this.state,
            minutes: val,
        });
        val && onTimeChange(t.setMinutes(date, parseInt(val, 10)));
    };

    onMeridianChange = (e) => {
        this.setState({
            ...this.state,
            meridian: e.target.value,
        });
        this.updateMeridianHours(e.target.value);
    };

    updateMeridianHours = function (meridian) {
        const { date, onTimeChange } = this.props;

        let milTime = 0;
        if (meridian === 'PM' && this.state.hours < 12) {
            milTime = 12;
        }
        if (meridian === 'AM' && this.state.hours == 12) {
            milTime = -12;
        }

        this.state.hours &&
            onTimeChange(
                t.setHours(date, parseInt(this.state.hours, 10) + milTime)
            );
    };

    render = () => {
        const { date, displayTime, dayLabels, monthLabels } = this.props;

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
                        <input
                            type='number'
                            name='hours'
                            value={this.state.hours}
                            onClick={() =>
                                this.setState({ ...this.state, hours: '' })
                            }
                            onChange={this.onHoursChange}
                            maxLength='2'
                        />
                        <span className='rlc-time-separator'>:</span>
                        <input
                            type='number'
                            name='minutes'
                            value={this.state.minutes}
                            onClick={() =>
                                this.setState({ ...this.state, minutes: '' })
                            }
                            onChange={this.onMinutesChange}
                            maxLength='2'
                        />
                        <select
                            name='meridian'
                            value={this.state.meridian}
                            onChange={this.onMeridianChange}
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
