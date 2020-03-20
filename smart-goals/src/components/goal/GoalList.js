import React from 'react';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Goal from './Goal';

const GoalList = () => {
    const goals = useSelector(state => state.goals);
    console.log('listComp', goals);
    return (
        <div>
            <h5>List of Goals</h5>
            {goals.list.map((goal, i) => (
                <Goal key={i} goal={goal} />
            ))}
        </div>
    );
};

export default GoalList;
