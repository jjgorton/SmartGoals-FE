import React from 'react';
import { withRouter } from 'react-router-dom';

import './workspaceCard.scss';

const WorkspaceCard = (props) => {
    const { ws } = props;
    //UPDATE and DELETE functions to be in the _Actual_ Workspace component

    const goToWorkSpace = (id) => {
        console.log(props);
        props.history.push(`/user/workspaces/${id}`);
    };

    const desc =
        ws.description.length > 33
            ? ws.description.slice(0, 30) + '...'
            : ws.description;

    return (
        <div
            className='workspace'
            onClick={() => goToWorkSpace(ws.workspace_id)}
        >
            <div>
                <h4 className='ws-card-title'>{ws.name}</h4>
                <h5 className='ws-card-role'>({ws.roles})</h5>
            </div>
            <p className='ws-card-desc'>{desc}</p>
        </div>
    );
};

export default withRouter(WorkspaceCard);
