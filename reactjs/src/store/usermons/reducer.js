import createReducer from '../helpers/createReducer';

import {
	REQ_USERMONS_PENDING,
	REQ_USERMONS_SUCCESS,
	REQ_USERMONS_ERROR,
	REQ_USERMON_PENDING,
	REQ_USERMON_SUCCESS,
	REQ_USERMON_ERROR,
	ADD_USERMON_PENDING,
	ADD_USERMON_SUCCESS,
	ADD_USERMON_ERROR,
	UPDATE_USERMON_PENDING,
	UPDATE_USERMON_SUCCESS,
	UPDATE_USERMON_ERROR,
	DELETE_USERMON_PENDING,
	DELETE_USERMON_SUCCESS,
	DELETE_USERMON_ERROR,
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
const usermonsPending = (state, action) => {
	// set loading state and clear error
	return {
		...state,
		isLoading: true,
		error: null,
	};
};

const usermonsSuccess = (state, action) => {
	// clear loading and error, update cache time, add users
	return {
		...state,
		isLoading: false,
		error: null,
		loadedAt: Date.now(),
		byId: {
			...state.byId,
			...Object.values(action.data).reduce(
				(usermons, usermon) => ({
					// keep the current object
					...usermons,
					// add the user id as the key and an user object for loading
					[usermon.id]: {
						data: {
							id: usermon.id,
							userId: usermon.userId,
							name: usermon.name,
							shiny: usermon.shiny,
							dex: usermon.dex,
							ball: usermon.ball,
							level: usermon.level,
							types: usermon.types,
							gender: usermon.gender,
							ability: usermon.ability,
							ivs: [
								{ HP: usermon.hp },
								{ Atk: usermon.atk },
								{ Def: usermon.def },
								{ SpAtk: usermon.spAtk },
								{ SpDef: usermon.spDef },
								{ Spd: usermon.spd },
							],
							eggMoves: usermon.eggMoves,
						},
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
				...Object.values(action.data).map((usermon) => usermon.id),
			]),
		],
	};
};

const usermonsError = (state, action) => {
	// clear loading and set error
	return {
		...state,
		isLoading: false,
		error: action.err,
	};
};

const usermonPending = (state, action) => {
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

const usermonSuccess = (state, action) => {
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

const usermonDelete = (state, action) => {
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

const usermonError = (state, action) => {
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
	[REQ_USERMONS_PENDING]: usermonsPending,
	[REQ_USERMONS_SUCCESS]: usermonsSuccess,
	[REQ_USERMONS_ERROR]: usermonsError,
	[REQ_USERMON_PENDING]: usermonPending,
	[REQ_USERMON_SUCCESS]: usermonSuccess,
	[REQ_USERMON_ERROR]: usermonError,
	[ADD_USERMON_PENDING]: usermonPending,
	[ADD_USERMON_SUCCESS]: usermonSuccess,
	[ADD_USERMON_ERROR]: usermonError,
	[UPDATE_USERMON_PENDING]: usermonPending,
	[UPDATE_USERMON_SUCCESS]: usermonSuccess,
	[UPDATE_USERMON_ERROR]: usermonError,
	[DELETE_USERMON_PENDING]: usermonPending,
	[DELETE_USERMON_SUCCESS]: usermonDelete,
	[DELETE_USERMON_ERROR]: usermonError,
});
