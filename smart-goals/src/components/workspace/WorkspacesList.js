import React from 'react';

import WorkspaceCard from './WorkspaceCard';

const WorkspaceList = props => {
    //get list of all workspaces

    //create a new workspace button to pull open create new modal? new component

    return (
        <div className='workspace-list'>
            <h3>All the Workspaces listed here</h3>
            {/* map over list of workspaces passing down workspace id and name*/}
            <WorkspaceCard />
        </div>
    );
};

export default WorkspaceList;
