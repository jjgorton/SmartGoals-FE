import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = rootReducer && createStore(rootReducer, applyMiddleware(thunk));

export default store;
