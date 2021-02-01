// get all the functions from redux
import { combineReducers, createStore, applyMiddleware } from 'redux';
// middleware for making actions async
import thunkMiddleware from 'redux-thunk';
// will log to console all the actions that are run
import { createLogger } from 'redux-logger';
// middleware to help with api calls
import callAPI from './helpers/callAPIMiddleware';

// pull our reducers
import items from './items/reducer';
import users from './users/reducer';
import usermons from './usermons/reducer';

// combine multiple reducers into one
const rootReducer = combineReducers({
	items,
	users,
	usermons,
});

// set up middleware
const middleware = applyMiddleware(thunkMiddleware, callAPI, createLogger());

// create a redux store using the combined reducer and middleware functions
const store = createStore(rootReducer, middleware);

export default store;
