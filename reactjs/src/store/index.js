// get all the functions from redux
import { combineReducers, createStore, applyMiddleware } from 'redux';
// middleware for making actions async
import thunkMiddleware from 'redux-thunk';
// will log to console all the actions that are run
import { createLogger } from 'redux-logger';
// middleware to help with api calls
import callAPI from './helpers/callAPIMiddleware';

// pull our reducers
import auth from './auth/reducer';
import items from './items/reducer';
import users from './users/reducer';
import usermons from './usermons/reducer';
import pokemon from './pokemon/reducer';
import moves from './moves/reducer';

// combine multiple reducers into one
const rootReducer = combineReducers({
	auth,
	items,
	users,
	usermons,
	pokemon,
	moves,
});

// set up middleware
const middleware = applyMiddleware(
	thunkMiddleware,
	callAPI,
	createLogger()
	// eslint-disable-next-line
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// create a redux store using the combined reducer and middleware functions
const store = createStore(rootReducer, middleware);

export default store;
