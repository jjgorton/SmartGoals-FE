//import action types

const initialState = {
    username: '',
    userID: '',
    email: '',
    workspaces: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
