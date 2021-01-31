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
	// will hold each item with ids as keys
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
const itemsPending = (state, action) => {
	// set loading state and clear error
	return {
		...state,
		isLoading: true,
		error: null,
	};
};

const itemsSuccess = (state, action) => {
	// clear loading and error, update cache time, add items
	return {
		...state,
		isLoading: false,
		error: null,
		loadedAt: Date.now(),
		byId: {
			...state.byId,
			...action.data.reduce(
				(items, item) => ({
					// keep the current object
					...items,
					// add the item id as the key and an item object for loading
					[item.id]: {
						data: item,
						isLoading: false,
						loadedAt: Date.now(),
						error: null,
					},
				}),
				{}
			),
		},
		allIds: [
			...new Set([...state.allIds, action.data.map((item) => item.id)]),
		],
	};
};

const itemsError = (state, action) => {
	// clear loading and set error
	return {
		...state,
		isLoading: false,
		error: action.err,
	};
};

// eslint-disable-next-line
const itemPending = (state, action) => {
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

const itemSuccess = (state, action) => {
	// clear loading and error, update cache time, add items
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
		allIds: [
			...new Set([...state.allIds, action.data.map((item) => item.id)]),
		],
	};
};

const itemError = (state, action) => {
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
	[REQ_USERS_PENDING]: itemsPending,
	[REQ_USERS_SUCCESS]: itemsSuccess,
	[REQ_USERS_ERROR]: itemsError,
	[REQ_USER_PENDING]: itemPending,
	[REQ_USER_SUCCESS]: itemSuccess,
	[REQ_USER_ERROR]: itemError,
	[ADD_USER_PENDING]: itemPending,
	[ADD_USER_SUCCESS]: itemSuccess,
	[ADD_USER_ERROR]: itemError,
	[UPDATE_USER_PENDING]: itemPending,
	[UPDATE_USER_SUCCESS]: itemSuccess,
	[UPDATE_USER_ERROR]: itemError,
});
