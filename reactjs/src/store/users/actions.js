import { v4 } from 'uuid/';
import API from '../../API';
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

const CACHE_TIME = 1000 * 60 * 5;

// eslint-disable-next-line
export const fetchUsers = () => ({
	// types for this action - "request, success, error"
	types: [REQ_USERS_PENDING, REQ_USERS_SUCCESS, REQ_USERS_ERROR],
	// a function used to call the api
	callAPI: () => API.get('/users'),
	// receives the current app state and returns true if we should call the api
	shouldCallAPI: (state) => {
		const { loadedAt, isLoading } = state.users;
		// if users are currently loading don't call again
		if (isLoading) return false;
		const isCached = Date.now() - loadedAt < CACHE_TIME;
		// if we don't have the user or it's beyond the cache timeout make the api call
		return !loadedAt || !isCached;
	},
});

export const createItem = (item) => {
	console.log('create item called');
	// create a uuid for this item so that we can use it in the reducers for pending and loading
	const id = v4;
	console.log(id);
	return {
		types: [ADD_USER_PENDING, ADD_USER_SUCCESS, ADD_USER_ERROR],
		callAPI: () => API.post('/items', { id, ...item }),
		payload: { id },
	};
};

export const fetchItem = (id) => ({
	types: [REQ_USER_PENDING, REQ_USER_SUCCESS, REQ_USER_ERROR],
	callAPI: () => API.get(`/items${id}`),
	shouldCallAPI: (state) => {
		const item = state.items.byId[id] || {};
		const { loadedAt, isLoading } = item;
		if (!item || isLoading) return false;
		const isCached = Date.now() - loadedAt < CACHE_TIME;
		return !loadedAt || !isCached;
	},
	payload: { id },
});

export const updateItem = (item) => ({
	types: [UPDATE_USER_PENDING, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR],
	callAPI: () => API.put(`/items/${item.id}`, item),
	payload: { id: item.id },
});
