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

    //forces word wrap for long titles and limits char count
    const name = ws.name.split(' ').some((s) => s.length > 7)
        ? ws.name.slice(0, 7) + '- ' + ws.name.slice(7, 14)
        : ws.name.slice(0, 14);

    // limits char count displayed
    const desc =
        ws.description.length > 33
            ? ws.description.slice(0, 35) + '...'
            : ws.description;

    return (
        <div
            className='workspace'
            onClick={() => goToWorkSpace(ws.workspace_id)}
        >
            <div>
                <h4 className='ws-card-title'>{name}</h4>
                <h5 className='ws-card-role'>({ws.roles})</h5>
            </div>
            <p className='ws-card-desc'>{desc}</p>
        </div>
    );
};

export default withRouter(WorkspaceCard);
