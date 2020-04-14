import React from 'react';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Goal from './Goal';

import './goalList.scss';

const GoalList = () => {
    const goals = useSelector((state) => state.goals);
    console.log('listComp', goals);
    if (goals.loading || !goals.list) {
        return <Loader type='Triangle' color='blue' height={50} width={50} />;
    }
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
