import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addStep } from '../../actions/goalActions';

const StepForm = (props) => {
    const dispatch = useDispatch();
    const [stepObj, setStepObj] = useState({
        name: '',
        description: '',
        est_time: null,
        due: null,
        completed: false,
        goal_id: props.goalID,
    });

    const [show, setShow] = useState(false);

    const handleChanges = (e) => {
        setStepObj({
            ...stepObj,
            [e.target.name]: e.target.value,
        });
    };

    const newStep = () => {
        dispatch(addStep(stepObj));
        setStepObj({
            name: '',
            description: '',
            est_time: null,
            due: null,
            completed: false,
            goal_id: props.goalID,
        });
    };

    return (
        <div>
            <form onSubmit={newStep}>
                <input
                    type='text'
                    name='name'
                    value={stepObj.name}
                    onChange={handleChanges}
                />
                <button>add Step</button>
            </form>
        </div>
    );
};

export default StepForm;
