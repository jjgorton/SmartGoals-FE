import React from 'react';
// import {
//     render,
//     fireEvent,
//     screen,
// } from '../../utils/testUtils/reduxTestStore';
import render from '../../utils/testUtils/reduxTestStore';
import { screen } from '@testing-library/react';

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
        auth: {
            userID: 1,
            username: 'Test Case',
            email: '',
            created_at: '',
            loading: false,
            error: null,
        },
    };

    const response = { data: fakeGoals };
    const match = { params: { id: 1 } };

    axiosWithAuth.get.mockResolvedValue(response);

    render(<Workspace match={match} />, initialState);

    const userName = screen.getByText(/test case/i);
    expect(userName).toBeInTheDocument();
});
