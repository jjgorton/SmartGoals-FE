import React from 'react';
import { withRouter } from 'react-router-dom';

const WorkspaceCard = props => {
    const { ws } = props;
    //UPDATE and DELETE functions to be in the _Actual_ Workspace component

    const goToWorkSpace = id => {
        console.log(props);
        props.history.push(`/workspace/${id}`);
    };

    return (
        <div
            className='workspace'
            onClick={() => goToWorkSpace(ws.workspace_id)}
        >
            <h4>{ws.name}</h4>
            <h5>{ws.roles}</h5>
            <p>{ws.description}</p>
            <p>{ws.created_at}</p>
        </div>
    );
};

export default withRouter(WorkspaceCard);
