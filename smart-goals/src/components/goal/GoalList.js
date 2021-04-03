import React from 'react';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Goal from './Goal';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import './goalList.scss';

const GoalList = () => {
    const goals = useSelector((state) => state.goals);

    // console.log('listComp', goals);

    // if (!goals.list) {
    //     return <Loader type='Triangle' color='blue' height={50} width={50} />;
    // }
    return (
        <DragDropContext>
            <Droppable droppableId='goals'>
                {(provided) => (
                    <div
                        className='goal-list'
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {goals.list.map((goal, i) => (
                            <Goal key={i} goal={goal} index={i} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default GoalList;
