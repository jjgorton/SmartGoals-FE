import React from 'react';

const WorkspaceCard = props => {
    const { ws } = props;
    //UPDATE and DELETE functions to be in the _Actual_ Workspace component

    //Go to workspace funtion  OOOOOOORRRRR just use a NavLink!!!
    const goToWorkSpace = id => {
        props.history.push(`/:${id}`);
    };

    return (
        <div className='workspace' onClick={() => goToWorkSpace(props.id)}>
            <h4>{ws.name}</h4>
            <h5>{ws.roles}</h5>
            <p>{ws.description}</p>
            <p>{ws.created_at}</p>
        </div>
    );
};

export default WorkspaceCard;
