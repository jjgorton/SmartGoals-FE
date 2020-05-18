import React, { useState, useEffect } from 'react';

import './progressBar.scss';

const ProgressBar = ({ goal }) => {
    const [percent, setPercent] = useState(5);
    useEffect(() => {
        setPercent(
            (goal.steps.filter((s) => s.completed).length / goal.steps.length) *
                100
        );
        console.log(percent);
    }, [goal.steps]);

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
