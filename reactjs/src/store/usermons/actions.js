import { v4 } from 'uuid/';
import API from '../../API';
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

const CACHE_TIME = 1000 * 60 * 5;

export const fetchUsermons = (username) => ({
	// types for this action - "request, success, error"
	types: [REQ_USERMONS_PENDING, REQ_USERMONS_SUCCESS, REQ_USERMONS_ERROR],
	// a function used to call the api
	callAPI: () => API.get(`/users/${username}/pokemon`),
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

export const createUsermon = (username, pokemon) => {
	// create a uuid for this pokemon so that we can use it in the reducers for pending and loading
	const id = v4();
	return {
		types: [ADD_USERMON_PENDING, ADD_USERMON_SUCCESS, ADD_USERMON_ERROR],
		callAPI: () =>
			API.post(`/users/${username}/pokemon`, { id, ...pokemon }),
		payload: { pokemon },
	};
};

export const fetchUsermon = (id, pokeId) => ({
	types: [REQ_USERMON_PENDING, REQ_USERMON_SUCCESS, REQ_USERMON_ERROR],
	callAPI: () => API.get(`/users/${id}/pokemon/${pokeId}`),
	shouldCallAPI: (state) => {
		const usermon = state.usermons.byId[id] || {};
		const { loadedAt, isLoading } = usermon;
		if (!usermon || isLoading) return false;
		const isCached = Date.now() - loadedAt < CACHE_TIME;
		return !loadedAt || !isCached;
	},
	payload: { id },
});

export const updateUsermon = (username, pokemon) => ({
	types: [
		UPDATE_USERMON_PENDING,
		UPDATE_USERMON_SUCCESS,
		UPDATE_USERMON_ERROR,
	],
	callAPI: () =>
		API.post(`/users/${username}/pokemon/${pokemon.id}`, pokemon),
	payload: { id: pokemon.id },
});

export const deleteUsermon = (username, id) => ({
	types: [
		DELETE_USERMON_PENDING,
		DELETE_USERMON_SUCCESS,
		DELETE_USERMON_ERROR,
	],
	callAPI: () => API.delete(`/users/${username}/pokemon/${id}`),
	payload: { id },
});
