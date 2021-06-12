export const fakeGoals = [
    {
        id: 1,
        name: 'goal Test with steps',
        description: 'bla bla bla\ndfjkjakdjf\nasdkljf',
        category: null,
        start_time: '2021-04-01T20:34:04.691Z',
        end_time: '2021-04-08T20:34:04.691Z',
        completed: false,
        workspace_id: 1,
        created_at: '2021-04-01T20:34:32.768Z',
        rank: 200,
        steps: [
            {
                id: 1,
                name: 'step 1',
                description: '',
                category: null,
                start_time: null,
                end_time: null,
                completed: false,
                goal_id: 1,
                created_at: '2021-04-01T20:34:43.490Z',
                rank: 0,
            },
            {
                id: 2,
                name: 'step 2',
                description: '',
                category: null,
                start_time: null,
                end_time: null,
                completed: false,
                goal_id: 1,
                created_at: '2021-04-01T20:34:49.584Z',
                rank: 0,
            },
            {
                id: 3,
                name: 'step 3',
                description: '',
                category: null,
                start_time: null,
                end_time: null,
                completed: false,
                goal_id: 1,
                created_at: '2021-04-01T20:34:54.983Z',
                rank: 0,
            },
        ],
    },
    {
        id: 2,
        name: 'goal 2',
        description: '',
        category: null,
        start_time: '2021-04-01T20:34:21.314Z',
        end_time: '2021-04-08T20:34:21.314Z',
        completed: false,
        workspace_id: 1,
        created_at: '2021-04-01T20:35:05.653Z',
        rank: 500,
        steps: [],
    },
    {
        id: 4,
        name: 'rank test',
        description: '',
        category: null,
        start_time: '2021-04-02T21:29:33.787Z',
        end_time: '2021-04-09T21:29:33.787Z',
        completed: false,
        workspace_id: 1,
        created_at: '2021-04-02T21:30:32.267Z',
        rank: 400,
        steps: [],
    },
    {
        id: 5,
        name: 'dev rank test',
        description: '',
        category: null,
        start_time: '2021-04-02T21:56:53.860Z',
        end_time: '2021-04-09T21:56:53.860Z',
        completed: false,
        workspace_id: 1,
        created_at: '2021-04-02T21:58:09.721Z',
        rank: 300,
        steps: [],
    },
    {
        id: 3,
        name: 'goal 3',
        description: 'third goal',
        category: null,
        start_time: '2021-04-01T04:00:00.000Z',
        end_time: '2021-04-02T22:00:00.000Z',
        completed: false,
        workspace_id: 1,
        created_at: '2021-04-01T20:36:46.074Z',
        rank: 350,
        steps: [],
    },
];

export const fakeWorkspaces = {
    workspaces: [
        {
            workspace_id: 1,
            roles: 'admin',
            name: 'test01',
            description:
                'description here bla bla bla.... yada yad yada\nantoher line\nand another',
            created_at: '2021-04-01T20:33:35.226Z',
            rank: 0,
        },
    ],
};