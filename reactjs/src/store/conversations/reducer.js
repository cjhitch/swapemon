import createReducer from '../helpers/createReducer';

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

const initialState = {
	// will hold each conversation with ids as keys
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
const conversationsPending = (state, action) => {
	// set loading state and clear error
	return {
		...state,
		isLoading: true,
		error: null,
	};
};

const conversationsSuccess = (state, action) => {
	console.log(state, action);
	// clear loading and error, update cache time, add conversations
	return {
		...state,
		isLoading: false,
		error: null,
		loadedAt: Date.now(),
		byId: {
			...state.byId,
			...Object.values(action.data).reduce(
				(conversations, conversation) => ({
					// keep the current object
					...conversations,
					// add the conversation id as the key and an conversation object for loading
					[conversation.id]: {
						data: conversation,
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
				...Object.values(action.data).map(
					(conversation) => conversation.id
				),
			]),
		],
	};
};

const conversationsError = (state, action) => {
	// clear loading and set error
	return {
		...state,
		isLoading: false,
		error: action.error,
	};
};

// eslint-disable-next-line
const conversationPending = (state, action) => {
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

const conversationSuccess = (state, action) => {
	console.log(state, action);
	// clear loading and error, update cache time, add conversations
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
			...new Set([
				...state.allIds,
				action.data.map((conversation) => conversation.id),
			]),
		],
	};
};

const conversationError = (state, action) => {
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
	[REQ_CONVERSATIONS_PENDING]: conversationsPending,
	[REQ_CONVERSATIONS_SUCCESS]: conversationsSuccess,
	[REQ_CONVERSATIONS_ERROR]: conversationsError,
	[REQ_CONVERSATION_PENDING]: conversationPending,
	[REQ_CONVERSATION_SUCCESS]: conversationSuccess,
	[REQ_CONVERSATION_ERROR]: conversationError,
	[ADD_CONVERSATION_PENDING]: conversationPending,
	[ADD_CONVERSATION_SUCCESS]: conversationSuccess,
	[ADD_CONVERSATION_ERROR]: conversationError,
	[UPDATE_CONVERSATION_PENDING]: conversationPending,
	[UPDATE_CONVERSATION_SUCCESS]: conversationSuccess,
	[UPDATE_CONVERSATION_ERROR]: conversationError,
});
