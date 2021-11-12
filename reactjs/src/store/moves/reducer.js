import createReducer from '../helpers/createReducer';

import {
	REQ_MOVES_PENDING,
	REQ_MOVES_SUCCESS,
	REQ_MOVES_ERROR,
	REQ_MOVE_PENDING,
	REQ_MOVE_SUCCESS,
	REQ_MOVE_ERROR,
	ADD_MOVE_PENDING,
	ADD_MOVE_SUCCESS,
	ADD_MOVE_ERROR,
	UPDATE_MOVE_PENDING,
	UPDATE_MOVE_SUCCESS,
	UPDATE_MOVE_ERROR,
	DELETE_MOVE_PENDING,
	DELETE_MOVE_SUCCESS,
	DELETE_MOVE_ERROR,
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
const movesPending = (state, action) => {
	// set loading state and clear error
	return {
		...state,
		isLoading: true,
		error: null,
	};
};

const movesSuccess = (state, action) => {
	return {
		...state,
		isLoading: false,
		error: null,
		loadedAt: Date.now(),
		byId: {
			...state.byId,
			...Object.values(action.data).reduce(
				(moves, move) => ({
					// keep the current object
					...moves,
					// add the poke id as the key and an poke object for loading
					[move.name]: {
						data: move,
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
				...Object.values(action.data).map((move) => move.name),
			]),
		],
	};
};

const movesError = (state, action) => {
	// clear loading and set error
	return {
		...state,
		isLoading: false,
		error: action.error,
	};
};

const movePending = (state, action) => {
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

const moveSuccess = (state, action) => {
	// clear loading and error, update cache time, add pokes
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

const moveDelete = (state, action) => {
	const newAll = state.allIds;
	const newBy = state.byId;
	newAll.splice(state.allIds.indexOf(action.payload.id), 1);
	delete newBy[action.payload.id];
	return {
		...state,
		byId: newBy,
		allIds: newAll,
	};
};

const moveError = (state, action) => {
	// clear loading and set error
	return {
		...state,
		byId: {
			...state.byId,
			[action.payload.id]: {
				...state.byId[action.payload.id],
				isLoading: false,
				error: action.error,
			},
		},
	};
};

export default createReducer(initialState, {
	[REQ_MOVES_PENDING]: movesPending,
	[REQ_MOVES_SUCCESS]: movesSuccess,
	[REQ_MOVES_ERROR]: movesError,
	[REQ_MOVE_PENDING]: movePending,
	[REQ_MOVE_SUCCESS]: moveSuccess,
	[REQ_MOVE_ERROR]: moveError,
	[ADD_MOVE_PENDING]: movePending,
	[ADD_MOVE_SUCCESS]: moveSuccess,
	[ADD_MOVE_ERROR]: moveError,
	[UPDATE_MOVE_PENDING]: movePending,
	[UPDATE_MOVE_SUCCESS]: moveSuccess,
	[UPDATE_MOVE_ERROR]: moveError,
	[DELETE_MOVE_PENDING]: movePending,
	[DELETE_MOVE_SUCCESS]: moveDelete,
	[DELETE_MOVE_ERROR]: moveError,
});
