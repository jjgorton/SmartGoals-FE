import React, { Component } from 'react';
import { number, func, bool, arrayOf, string, oneOfType } from 'prop-types';
import t from 'timestamp-utils';
import {
    initMonth,
    parseRange,
    getDays,
    dateIsBetween,
    dateIsOut,
    getDateWithoutTime,
} from '../utils';

// Components
import DateDetails from './DateDetails';
import Navigation from './Navigation';

// Styles
// import './index.css';
import './calendar.scss';

class Calendar extends Component {
    constructor(props) {
        super(props);
        t.setTimezone(props.timezone);
        this.state = this.getInitialState(props);
    }

    componentDidUpdate = (prevProps) => {
        const { timezone, startDate, endDate } = this.props;
        // if (timezone !== prevProps.timezone) t.setTimezone(timezone);
        if (startDate !== prevProps.startDate || endDate !== prevProps.endDate)
            this.setState(this.getInitialState(this.props));
    };

    getInitialState = ({ startDate, endDate }) => ({
        ...initMonth(startDate),
        ...parseRange(startDate, endDate),
    });

    onClickDay = (day) => {
        const { startDate, endDate } = this.state;

        const dayWithStartTime = t.set(day, {
            hours: parseInt(t.getHours(startDate)),
            minutes: parseInt(t.getMinutes(startDate)),
        });
        const dayWithEndTime = t.set(day, {
            hours: parseInt(t.getHours(endDate)),
            minutes: parseInt(t.getMinutes(endDate)),
        });

        if (!startDate) this.update({ startDate: dayWithStartTime });
        else if (startDate && !endDate)
            this.update(parseRange(startDate, dayWithEndTime));
        else this.update({ startDate: dayWithStartTime, endDate: null });
    };

    changeMonth = ({ yearOffset = 0, monthOffset = 0 }) => {
        const { firstMonthDay } = this.state;
        const timestamp = t.add(firstMonthDay, {
            months: monthOffset,
            years: yearOffset,
        });
        this.setState(initMonth(timestamp));
    };

    update = ({ startDate, endDate }) => {
        const sDate =
            startDate === undefined ? this.props.startDate : startDate;
        const eDate = endDate === undefined ? this.props.endDate : endDate;
        this.props.onChange(sDate, eDate);
    };

    getClassNames = (day) => {
        const { firstMonthDay, lastMonthDay, startDate, endDate } = this.state;
        const { disableDates, markedDays } = this.props;
        const sDate = getDateWithoutTime(startDate);
        const eDate = getDateWithoutTime(endDate);
        const isMarked =
            typeof markedDays === 'function'
                ? markedDays(day)
                : Array.isArray(markedDays)
                ? markedDays.map(getDateWithoutTime).includes(day)
                : false;

        const time = new Date();
        const tz = time.getTimezoneOffset() * 60 * 1000;
        const localTimeStamp = time.getTime() - tz;

        const conditions = {
            'rlc-day-disabled': disableDates(day),
            'rlc-day-today': day === getDateWithoutTime(localTimeStamp),
            'rlc-day-inside-selection': dateIsBetween(day, sDate, eDate),
            'rlc-day-out-of-month': dateIsOut(day, firstMonthDay, lastMonthDay),
            'rlc-day-selected': !endDate && sDate === day,
            'rlc-day-start-selection': endDate && sDate === day,
            'rlc-day-end-selection': endDate && eDate === day,
            [`rlc-day-${day}`]: true,
            'rlc-day-marked': isMarked,
        };

        return Object.entries(conditions).reduce(
            (prev, [className, valid]) =>
                valid ? `${prev} ${className}` : prev,
            ''
        );
    };

    render = () => {
        // console.log(t);
        // console.log(this.props.timezone);
        const {
            firstDayToDisplay,
            startDate: sDate,
            endDate: eDate,
            month,
            year,
        } = this.state;
        const {
            disableDates,
            displayTime,
            dayLabels,
            monthLabels,
            onClickDate,
        } = this.props;

        return (
            <div className='rlc-calendar'>
                <div className='rlc-details'>
                    {!!sDate && (
                        <DateDetails
                            dayLabels={dayLabels}
                            monthLabels={monthLabels}
                            date={sDate}
                            displayTime={displayTime}
                            onTimeChange={(date) =>
                                this.update({ startDate: date })
                            }
                        />
                    )}
                    {!!eDate && (
                        <DateDetails
                            dayLabels={dayLabels}
                            monthLabels={monthLabels}
                            date={eDate}
                            displayTime={displayTime}
                            onTimeChange={(date) =>
                                this.update({ endDate: date })
                            }
                        />
                    )}
                </div>
                <Navigation
                    monthLabels={monthLabels}
                    month={month}
                    year={year}
                    onChange={this.changeMonth}
                />
                <div className='rlc-days-label'>
                    {dayLabels.map((label) => (
                        <div
                            className='rlc-day-label'
                            key={label.toLowerCase()}
                        >
                            {label.slice(0, 2)}
                        </div>
                    ))}
                </div>
                <div className='rlc-days'>
                    {getDays(firstDayToDisplay).map((day) => (
                        <div
                            className={`rlc-day ${this.getClassNames(day)}`}
                            key={day}
                            onClick={() => {
                                onClickDate(day);
                                !disableDates(day) && this.onClickDay(day);
                            }}
                        >
                            {parseInt(t.getDay(day), 10)}
                        </div>
                    ))}
                </div>
            </div>
        );
    };
}

Calendar.defaultProps = {
    startDate: null,
    endDate: null,
    onChange: () => {},
    disableDates: () => false,
    displayTime: false,
    range: true,
    dayLabels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ],
    monthLabels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    timezone: 'UTC',
    markedDays: () => false,
    onClickDate: () => {},
};

Calendar.propTypes = {
    startDate: number,
    endDate: number,
    onChange: func,
    disableDates: func,
    displayTime: bool,
    dayLabels: arrayOf(string),
    monthLabels: arrayOf(string),
    timezone: string,
    markedDays: oneOfType([arrayOf(number), func]),
    onClickDate: func,
    range: bool,
};

export default Calendar;
