import { v4 } from 'uuid/';
import API from '../../API';
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

const CACHE_TIME = 1000 * 60 * 5;

// eslint-disable-next-line
export const fetchItems = () => ({
	// types for this action - "request, success, error"
	types: [REQ_ITEMS_PENDING, REQ_ITEMS_SUCCESS, REQ_ITEMS_ERROR],
	// a function used to call the api
	callAPI: () => API.get('/items'),
	// receives the current app state and returns true if we should call the api
	shouldCallAPI: (state) => {
		const { loadedAt, isLoading } = state.items;
		// if items are currently loading don't call again
		if (isLoading) return false;
		const isCached = Date.now() - loadedAt < CACHE_TIME;
		// if we don't have the item or it's beyond the cache timeout make the api call
		return !loadedAt || !isCached;
	},
});

export const createItem = (item) => {
	// create a uuid for this item so that we can use it in the reducers for pending and loading
	const id = v4;
	console.log(id);
	return {
		types: [ADD_ITEM_PENDING, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR],
		callAPI: () => API.post('/items', { id, ...item }),
		payload: { id },
	};
};

export const fetchItem = (id) => ({
	types: [REQ_ITEM_PENDING, REQ_ITEM_SUCCESS, REQ_ITEM_ERROR],
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
	types: [UPDATE_ITEM_PENDING, UPDATE_ITEM_SUCCESS, UPDATE_ITEM_ERROR],
	callAPI: () => API.put(`/items/${item.id}`, item),
	payload: { id: item.id },
});
