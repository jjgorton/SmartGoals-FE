import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Workspace = props => {
    const workspaces = useSelector(state => state.workspaces);
    const dispatch = useDispatch();

    const ws = workspaces.list.filter(data => {
        return data.workspace_id == props.match.params.id;
    });
    console.log(ws);

    useEffect(() => {});

    return (
        <div>
            <h1>Workspace Info and Goal Lists here</h1>
        </div>
    );
};

export default Workspace;
