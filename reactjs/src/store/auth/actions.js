import API from '../../API';
// import { SET_LOGGED_IN, SET_LOGGED_OUT } from '../actionTypes';
import { SET_LOGGED_IN } from '../actionTypes';
// import { REQ_USERS_PENDING, REQ_USERS_SUCCESS, REQ_USERS_ERROR } from '../actionTypes';

// const CACHE_TIME = 1000 * 60 * 5;

export const verifyUser = (username, password) => async (dispatch) => {
	const {
		data: { loggedIn, token, user },
	} = await API.post('/auth', { username, password });
	localStorage.setItem('token', token);
	dispatch({ loggedIn, type: SET_LOGGED_IN, user });
};

export const logout = () => async (dispatch) => {
	localStorage.removeItem('token');
	dispatch({ loggedIn: false, type: SET_LOGGED_IN, user: {} });
};

// export const reset = (email) => async (dispatch) => {
// 	API.post
// }
// was trying to match more of the same we used for capstone but I was unable to translate this into working
// export const verifyUser = (password, username) => ({
// 	types: [REQ_USERS_PENDING, REQ_USERS_SUCCESS, REQ_USERS_ERROR],
// 	callAPI: (password, username) => API.post('/auth'), { password, username },
// 	// receives the current app state and returns true if we should call the api
// 	shouldCallAPI: (state) => {
// 		const { loadedAt, isLoading } = state.auth;
// 		// if auth is currently loading don't call again
// 		if (isLoading) return false;
// 		const isCached = Date.now() - loadedAt < CACHE_TIME;
// 		// if we don't have the auth or it's beyond the cache timeout make the api call
// 		return !loadedAt || !isCached;
// 	},
// });
