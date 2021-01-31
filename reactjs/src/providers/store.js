import React, { createContext, useReducer } from 'react';

const initialState = { color: 'black' };
const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer((stat, action) => {
		switch (action.type) {
			case 'action description': {
				const newState = 'hi';
				return newState;
			}
			default:
				throw new Error();
		}
	}, initialState);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
