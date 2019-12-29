import React from 'react';

const WorkspaceCard = props => {
    //UPDATE and DELETE functions to be in the _Actual_ Workspace component

    //Go to workspace funtion  OOOOOOORRRRR just use a NavLink!!!
    const goToWorkSpace = id => {
        props.history.push(`/:${id}`);
    };

    return (
        <div className='workspace' onClick={() => goToWorkSpace(props.id)}>
            <h4>Workspace</h4>
        </div>
    );
};

export default WorkspaceCard;
