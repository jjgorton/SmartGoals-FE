import React from 'react';
// import {
//     render,
//     fireEvent,
//     screen,
// } from '../../utils/testUtils/reduxTestStore';
import render from '../../utils/testUtils/reduxTestStore';

import Workspace from './Workspace';
import { fakeGoals, fakeWorkspaces } from '../../utils/testUtils/fakeData';
import axios from 'axios';
import axiosWithAuth from '../../utils/axiosWithAuth';

axiosWithAuth.get = jest.fn();

test('Workspace renders', () => {
    const initialState = {
        workspaces: {
            list: fakeWorkspaces.workspaces,
            loading: false,
            error: null,
        },
    };

    const response = { data: fakeGoals };
    const match = { params: { id: 1 } };

    axiosWithAuth.get.mockResolvedValue(response);

    render(<Workspace match={match} />, initialState);
});
