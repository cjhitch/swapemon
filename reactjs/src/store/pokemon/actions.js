import { v4 } from 'uuid/';
import API from '../../API';
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

const CACHE_TIME = 1000 * 60 * 5;

export const fetchPokemons = () => ({
	// types for this action - "request, success, error"
	types: [REQ_POKEMONS_PENDING, REQ_POKEMONS_SUCCESS, REQ_POKEMONS_ERROR],
	// a function used to call the api
	callAPI: () => API.get(`/pokemon`),
	// receives the current app state and returns true if we should call the api
	shouldCallAPI: (state) => {
		const { loadedAt, isLoading } = state.users;
		// if usermonss are currently loading don't call again
		if (isLoading) return false;
		const isCached = Date.now() - loadedAt < CACHE_TIME;
		// if we don't have the usermon or it's beyond the cache timeout make the api call
		return !loadedAt || !isCached;
	},
});

export const createPokemon = (pokemon) => {
	// create a uuid for this pokemon so that we can use it in the reducers for pending and loading
	const id = v4();
	return {
		types: [ADD_POKEMON_PENDING, ADD_POKEMON_SUCCESS, ADD_POKEMON_ERROR],
		callAPI: () => API.post(`/pokemon`, { id, ...pokemon }),
		payload: { pokemon },
	};
};

export const fetchPokemon = (id) => ({
	types: [REQ_POKEMON_PENDING, REQ_POKEMON_SUCCESS, REQ_POKEMON_ERROR],
	callAPI: () => API.get(`/pokemon/${id}`),
	shouldCallAPI: (state) => {
		const pokemon = state.pokemons.byId[id] || {};
		const { loadedAt, isLoading } = pokemon;
		if (!pokemon || isLoading) return false;
		const isCached = Date.now() - loadedAt < CACHE_TIME;
		return !loadedAt || !isCached;
	},
	payload: { id },
});

export const updateUsermon = (pokemon) => ({
	types: [
		UPDATE_POKEMON_PENDING,
		UPDATE_POKEMON_SUCCESS,
		UPDATE_POKEMON_ERROR,
	],
	callAPI: () => API.post(`/pokemon/${pokemon.id}`, pokemon),
	payload: { id: pokemon.id },
});

export const deleteUsermon = (id) => ({
	types: [
		DELETE_POKEMON_PENDING,
		DELETE_POKEMON_SUCCESS,
		DELETE_POKEMON_ERROR,
	],
	callAPI: () => API.delete(`/pokemon/${id}`),
	payload: { id },
});
