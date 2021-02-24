// action types that should change this state
import { SET_LOGGED_IN } from '../actionTypes';

const startState = {
	loggedIn: !!localStorage.getItem('token'),
};

export default function authReducer(state = startState, action) {
	// pull out the type and save every thing else to "payload"
	const { type, ...payload } = action;
	// see if the action type matches any that should make changes to this state
	switch (type) {
		case SET_LOGGED_IN: {
			const { loggedIn } = payload;
			// return a new object that has all the props of the current state
			return {
				...state,
				loggedIn,
			};
		}
		// no matches found, return the current unchanged state
		default:
			return state;
	}
}
