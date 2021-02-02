import createReducer from '../helpers/createReducer';

import {
	REQ_POKEMONS_PENDING,
	REQ_POKEMONS_SUCCESS,
	REQ_POKEMONS_ERROR,
	REQ_POKEMON_PENDING,
	REQ_POKEMON_SUCCESS,
	REQ_POKEMON_ERROR,
	ADD_POKEMON_PENDING,
	ADD_POKEMON_SUCCESS,
	ADD_POKEMON_ERROR,
	UPDATE_POKEMON_PENDING,
	UPDATE_POKEMON_SUCCESS,
	UPDATE_POKEMON_ERROR,
	DELETE_POKEMON_PENDING,
	DELETE_POKEMON_SUCCESS,
	DELETE_POKEMON_ERROR,
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
const pokemonsPending = (state, action) => {
	// set loading state and clear error
	return {
		...state,
		isLoading: true,
		error: null,
	};
};

const pokemonsSuccess = (state, action) => {
	return {
		...state,
		isLoading: false,
		error: null,
		loadedAt: Date.now(),
		byId: {
			...state.byId,
			...Object.values(action.data).reduce(
				(pokemons, pokemon) => ({
					// keep the current object
					...pokemons,
					// add the poke id as the key and an poke object for loading
					[pokemon.name]: {
						data: pokemon,
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
				...Object.values(action.data).map((pokemon) => pokemon.name),
			]),
		],
	};
};

const pokemonsError = (state, action) => {
	// clear loading and set error
	return {
		...state,
		isLoading: false,
		error: action.err,
	};
};

const pokemonPending = (state, action) => {
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

const pokemonSuccess = (state, action) => {
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

const pokemonDelete = (state, action) => {
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

const pokemonError = (state, action) => {
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
	[REQ_POKEMONS_PENDING]: pokemonsPending,
	[REQ_POKEMONS_SUCCESS]: pokemonsSuccess,
	[REQ_POKEMONS_ERROR]: pokemonsError,
	[REQ_POKEMON_PENDING]: pokemonPending,
	[REQ_POKEMON_SUCCESS]: pokemonSuccess,
	[REQ_POKEMON_ERROR]: pokemonError,
	[ADD_POKEMON_PENDING]: pokemonPending,
	[ADD_POKEMON_SUCCESS]: pokemonSuccess,
	[ADD_POKEMON_ERROR]: pokemonError,
	[UPDATE_POKEMON_PENDING]: pokemonPending,
	[UPDATE_POKEMON_SUCCESS]: pokemonSuccess,
	[UPDATE_POKEMON_ERROR]: pokemonError,
	[DELETE_POKEMON_PENDING]: pokemonPending,
	[DELETE_POKEMON_SUCCESS]: pokemonDelete,
	[DELETE_POKEMON_ERROR]: pokemonError,
});
