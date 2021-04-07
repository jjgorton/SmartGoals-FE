import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Goal from './Goal';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { updateGoal, updateStep } from '../../actions/goalActions';
import normalizeRank from '../../utils/normalizeRank/';

import './goalList.scss';

const GoalList = () => {
    const goals = useSelector((state) => state.goals);
    const dispatch = useDispatch();

    const [sortedGoals, setSortedGoals] = useState([]);

    useEffect(
        () => setSortedGoals(goals.list.sort((a, b) => a.rank - b.rank)),
        [goals]
    );

    // console.log('listComp', goals);

    const handleOnDragEnd = ({ source, destination, type }) => {
        console.log(
            'source:\n',
            source,
            '\n\ndestination\n',
            destination,
            '\n\ntype\n',
            type
        );
        if (!destination) return;

        if (type === 'goals') {
            // only need id and rank for the copied list
            const goalListCopy = goals.list.map((obj) => {
                return { id: obj.id, rank: obj.rank };
            });
            const [draggedGoal] = goalListCopy.splice(source.index, 1);
            goalListCopy.splice(destination.index, 0, draggedGoal);

            //if normalization was needed, then update all with new ranks
            const ranked = normalizeRank(goalListCopy, destination.index);

            Promise.all(ranked.map((obj) => dispatch(updateGoal(obj))));
        } else {
            console.log('else', type.slice(0, -5));
            const goalIndex = type.slice(0, -5);

            // only need id, rank, and goal_id for the copied list
            const stepListCopy = sortedGoals[goalIndex].steps.map((obj) => {
                return { id: obj.id, rank: obj.rank, goal_id: obj.goal_id };
            });
            const [draggedStep] = stepListCopy.splice(source.index, 1);
            stepListCopy.splice(destination.index, 0, draggedStep);

            //if normalization was needed, then update all with new ranks
            const ranked = normalizeRank(stepListCopy, destination.index);

            Promise.all(ranked.map((obj) => dispatch(updateStep(obj))));
        }
    };

    // if (!goals.list) {
    //     return <Loader type='Triangle' color='blue' height={50} width={50} />;
    // }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='goals' type='goals'>
                {(provided, snapshot) => (
                    <div
                        className='goal-list'
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {sortedGoals.map((goal, i) => (
                            <Goal key={goal.id} goal={goal} index={i} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default GoalList;
