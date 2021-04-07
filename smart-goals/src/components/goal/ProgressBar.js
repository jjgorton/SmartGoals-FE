import React, { useState, useEffect } from 'react';

import './progressBar.scss';

const ProgressBar = ({ goal, checkProgress }) => {
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
    }, [checkProgress, goal.steps, goal.steps.length, goal.completed]);

    return (
        <div className='progress-bar-container'>
            <div className='bar'>
                <div
                    className='progress'
                    style={{ transform: `scaleX(${percent})` }}></div>
            </div>
        </div>
    );
};

export default ProgressBar;
