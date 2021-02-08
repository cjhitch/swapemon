import createReducer from '../helpers/createReducer';

import {
	REQ_ITEMS_PENDING,
	REQ_ITEMS_SUCCESS,
	REQ_ITEMS_ERROR,
	REQ_ITEM_PENDING,
	REQ_ITEM_SUCCESS,
	REQ_ITEM_ERROR,
	ADD_ITEM_PENDING,
	ADD_ITEM_SUCCESS,
	ADD_ITEM_ERROR,
	UPDATE_ITEM_PENDING,
	UPDATE_ITEM_SUCCESS,
	UPDATE_ITEM_ERROR,
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
			...Object.values(action.data).reduce(
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
			...new Set([
				...state.allIds,
				...Object.values(action.data).map((item) => item.id),
			]),
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
	[REQ_ITEMS_PENDING]: itemsPending,
	[REQ_ITEMS_SUCCESS]: itemsSuccess,
	[REQ_ITEMS_ERROR]: itemsError,
	[REQ_ITEM_PENDING]: itemPending,
	[REQ_ITEM_SUCCESS]: itemSuccess,
	[REQ_ITEM_ERROR]: itemError,
	[ADD_ITEM_PENDING]: itemPending,
	[ADD_ITEM_SUCCESS]: itemSuccess,
	[ADD_ITEM_ERROR]: itemError,
	[UPDATE_ITEM_PENDING]: itemPending,
	[UPDATE_ITEM_SUCCESS]: itemSuccess,
	[UPDATE_ITEM_ERROR]: itemError,
});
