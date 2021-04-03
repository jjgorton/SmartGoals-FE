import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { render } from '@testing-library/react';
import App from './App';

test('renders App Title', () => {
    const { getByText } = render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    const title = getByText(/Welcome/i);
    expect(title).toBeInTheDocument();
});
