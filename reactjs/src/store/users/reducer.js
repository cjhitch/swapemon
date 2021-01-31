import createReducer from '../helpers/createReducer';

import {
	REQ_USERS_PENDING,
	REQ_USERS_SUCCESS,
	REQ_USERS_ERROR,
	REQ_USER_PENDING,
	REQ_USER_SUCCESS,
	REQ_USER_ERROR,
	ADD_USER_PENDING,
	ADD_USER_SUCCESS,
	ADD_USER_ERROR,
	UPDATE_USER_PENDING,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
} from '../actionTypes';

const initialState = {
	// will hold each user with ids as keys
	byId: {},
	// an array of all the ids
	allIds: [],
	// needed for cache state
	loadedAt: 0,
	// tracking if the state is loading
	isLoading: false,
	// any errors loading all the data
	error: null,
};

// eslint-disable-next-line
const usersPending = (state, action) => {
	// set loading state and clear error
	return {
		...state,
		isLoading: true,
		error: null,
	};
};

const usersSuccess = (state, action) => {
	// clear loading and error, update cache time, add users
	return {
		...state,
		isLoading: false,
		error: null,
		loadedAt: Date.now(),
		byId: {
			...state.byId,
			...action.data.reduce(
				(users, user) => ({
					// keep the current object
					...users,
					// add the user id as the key and an user object for loading
					[user.id]: {
						data: user,
						isLoading: false,
						loadedAt: Date.now(),
						error: null,
					},
				}),
				{}
			),
		},
		allIds: [
			...new Set([...state.allIds, action.data.map((user) => user.id)]),
		],
	};
};

const usersError = (state, action) => {
	// clear loading and set error
	return {
		...state,
		isLoading: false,
		error: action.err,
	};
};

const userPending = (state, action) => {
	// set loading state and clear error
	return {
		...state,
		byId: {
			...state.byId,
			[action.payload.id]: {
				...state.byId[action.payload.id],
				isLoading: true,
				error: null,
			},
		},
	};
};

const userSuccess = (state, action) => {
	// clear loading and error, update cache time, add users
	return {
		...state,
		byId: {
			...state.byId,
			[action.payload.id]: {
				isLoading: false,
				error: null,
				loadedAt: Date.now(),
				data: action.data,
			},
		},
		allIds: [...new Set([...state.allIds, action.payload.id])],
	};
};

const userError = (state, action) => {
	// clear loading and set error
	return {
		...state,
		byId: {
			...state.byId,
			[action.payload.id]: {
				...state.byId[action.payload.id],
				isLoading: false,
				error: action.err,
			},
		},
	};
};

export default createReducer(initialState, {
	[REQ_USERS_PENDING]: usersPending,
	[REQ_USERS_SUCCESS]: usersSuccess,
	[REQ_USERS_ERROR]: usersError,
	[REQ_USER_PENDING]: userPending,
	[REQ_USER_SUCCESS]: userSuccess,
	[REQ_USER_ERROR]: userError,
	[ADD_USER_PENDING]: userPending,
	[ADD_USER_SUCCESS]: userSuccess,
	[ADD_USER_ERROR]: userError,
	[UPDATE_USER_PENDING]: userPending,
	[UPDATE_USER_SUCCESS]: userSuccess,
	[UPDATE_USER_ERROR]: userError,
});
