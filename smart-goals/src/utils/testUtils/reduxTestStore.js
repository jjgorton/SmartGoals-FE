import React from 'react';
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers';
import { BrowserRouter as Router } from 'react-router-dom';

//reducers default to it's initial state when undefined
const initialState = {
    auth: undefined,
    workspaces: undefined,
    goals: undefined,
};

function renderWithProviders(ui, stateOptions = {}) {
    const store = createStore(
        rootReducer,
        { ...initialState, ...stateOptions },
        applyMiddleware(thunk)
    );

    return render(
        <Provider store={store}>
            <Router>{ui}</Router>
        </Provider>
    );
}

export default renderWithProviders;

//----------------------------------------
// // test-utils.js
// import React from 'react';
// import { render as rtlRender } from '@testing-library/react';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// // Import your own reducer
// import reducer from '../../reducers/';

// function render(
//     ui,
//     {
//         initialState,
//         store = createStore(reducer, initialState),
//         ...renderOptions
//     } = {}
// ) {
//     function Wrapper({ children }) {
//         return <Provider store={store}>{children}</Provider>;
//     }
//     return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// }

// // re-export everything
// export * from '@testing-library/react';
// // override render method
// export { render };

// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//     if (typeof action === 'function') {
//         return action(dispatch, getState);
//     }

//     return next(action);
// };

// const create = () => {
//     const store = {
//         getState: jest.fn(() => ({})),
//         dispatch: jest.fn(),
//     };
//     const next = jest.fn();

//     const invoke = (action) => thunk(store)(next)(action);

//     return { store, next, invoke };
// };
