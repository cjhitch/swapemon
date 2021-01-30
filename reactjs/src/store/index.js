// get all the functions from redux
import { combineReducers, createStore, applyMiddleware } from 'redux';
// middleware for making actions async
import thunkMiddleware from 'redux-thunk';
// will log to console all the actions that are run
import { createLogger } from 'redux-logger';

// pull our reducers

// combine multiple reducers into one
const rootReducer = combineReducers({});

const middleware = applyMiddleware(thunkMiddleware, createLogger());
// set up middleware

// create a redux store using the combined reducer and middleware functions
const store = createStore(rootReducer, middleware);

export default store;
