import { v4 } from 'uuid/';
import API from '../../API';
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

const CACHE_TIME = 1000 * 60 * 5;

export const fetchMoves = () => ({
	// types for this action - "request, success, error"
	types: [REQ_MOVES_PENDING, REQ_MOVES_SUCCESS, REQ_MOVES_ERROR],
	// a function used to call the api
	callAPI: () => API.get(`/moves`),
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

export const createMove = (move) => {
	// create a uuid for this move so that we can use it in the reducers for pending and loading
	const id = v4();
	return {
		types: [ADD_MOVE_PENDING, ADD_MOVE_SUCCESS, ADD_MOVE_ERROR],
		callAPI: () => API.post(`/moves`, { id, ...move }),
		payload: { move },
	};
};

export const fetchmove = (id) => ({
	types: [REQ_MOVE_PENDING, REQ_MOVE_SUCCESS, REQ_MOVE_ERROR],
	callAPI: () => API.get(`/moves/${id}`),
	shouldCallAPI: (state) => {
		const move = state.moves.byId[id] || {};
		const { loadedAt, isLoading } = move;
		if (!move || isLoading) return false;
		const isCached = Date.now() - loadedAt < CACHE_TIME;
		return !loadedAt || !isCached;
	},
	payload: { id },
});

export const updateUsermon = (move) => ({
	types: [UPDATE_MOVE_PENDING, UPDATE_MOVE_SUCCESS, UPDATE_MOVE_ERROR],
	callAPI: () => API.post(`/moves/${move.id}`, move),
	payload: { id: move.id },
});

export const deleteUsermon = (id) => ({
	types: [DELETE_MOVE_PENDING, DELETE_MOVE_SUCCESS, DELETE_MOVE_ERROR],
	callAPI: () => API.delete(`/moves/${id}`),
	payload: { id },
});
