import { v4 } from 'uuid/';
import API from '../../API';
import {
	REQ_CONVERSATIONS_PENDING,
	REQ_CONVERSATIONS_SUCCESS,
	REQ_CONVERSATIONS_ERROR,
	REQ_CONVERSATION_PENDING,
	REQ_CONVERSATION_SUCCESS,
	REQ_CONVERSATION_ERROR,
	ADD_CONVERSATION_PENDING,
	ADD_CONVERSATION_SUCCESS,
	ADD_CONVERSATION_ERROR,
	UPDATE_CONVERSATION_PENDING,
	UPDATE_CONVERSATION_SUCCESS,
	UPDATE_CONVERSATION_ERROR,
} from '../actionTypes';

const CACHE_TIME = 1000 * 60 * 5;

// eslint-disable-next-line
export const fetchConversations = (id) => ({
	// types for this action - "request, success, error"
	types: [
		REQ_CONVERSATIONS_PENDING,
		REQ_CONVERSATIONS_SUCCESS,
		REQ_CONVERSATIONS_ERROR,
	],
	// a function used to call the api
	callAPI: () => API.get(`/conversations?userId=${id}`),
	// receives the current app state and returns true if we should call the api
	shouldCallAPI: (state) => {
		const { loadedAt, isLoading } = state.conversations;
		// if conversations are currently loading don't call again
		if (isLoading) return false;
		const isCached = Date.now() - loadedAt < CACHE_TIME;
		// if we don't have the conversation or it's beyond the cache timeout make the api call
		return !loadedAt || !isCached;
	},
});

export const createConversation = (conversation) => {
	// create a uuid for this conversation so that we can use it in the reducers for pending and loading
	const id = v4;
	return {
		types: [
			ADD_CONVERSATION_PENDING,
			ADD_CONVERSATION_SUCCESS,
			ADD_CONVERSATION_ERROR,
		],
		callAPI: () => API.post('/conversations', { id, ...conversation }),
		payload: { id },
	};
};

export const fetchConversation = (id) => ({
	types: [
		REQ_CONVERSATION_PENDING,
		REQ_CONVERSATION_SUCCESS,
		REQ_CONVERSATION_ERROR,
	],
	callAPI: () => API.get(`/conversations${id}`),
	shouldCallAPI: (state) => {
		const conversation = state.conversations.byId[id] || {};
		const { loadedAt, isLoading } = conversation;
		if (!conversation || isLoading) return false;
		const isCached = Date.now() - loadedAt < CACHE_TIME;
		return !loadedAt || !isCached;
	},
	payload: { id },
});

export const updateConversation = (conversation) => ({
	types: [
		UPDATE_CONVERSATION_PENDING,
		UPDATE_CONVERSATION_SUCCESS,
		UPDATE_CONVERSATION_ERROR,
	],
	callAPI: () => API.put(`/conversations/${conversation.id}`, conversation),
	payload: { id: conversation.id },
});
