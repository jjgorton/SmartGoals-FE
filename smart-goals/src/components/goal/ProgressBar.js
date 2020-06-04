import React, { useState, useEffect } from 'react';

import './progressBar.scss';

const ProgressBar = ({ goal }) => {
    const [percent, setPercent] = useState(5);
    useEffect(() => {
        if (goal.steps.length) {
            setPercent(
                (goal.steps.filter((s) => s.completed).length /
                    goal.steps.length) *
                    100
            );
        } else if (goal.completed) {
            setPercent(100);
        } else if (!goal.completed) {
            setPercent(5);
        }
    }, [goal.steps, goal.steps.length, goal.completed]);

    return (
        <div className='progress-bar-container'>
            <div className='bar'>
                <div
                    className='progress'
                    style={{ transform: `scaleX(${percent})` }}
                ></div>
            </div>
            {/* <div className='timeline'>
                <p className='start'>{goal.start}</p>
                <div className='now'></div>
                <p className='due'>{goal.due}</p>
            </div> */}
        </div>
    );
};

export default ProgressBar;
