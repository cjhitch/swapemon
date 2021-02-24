import API from '../../API';
import { SET_LOGGED_IN } from '../actionTypes';

export const verifyUser = (password, username) => async (dispatch) => {
	try {
		const {
			data: { loggedIn, token },
		} = await API.post('/auth', { password, username });
		localStorage.setItem('token', token);
		dispatch({ loggedIn, type: SET_LOGGED_IN });
	} catch (error) {
		console.log(error);
	}
};

export const logout = () => {
	localStorage.removeItem('token');
	return { loggedIn: false, type: SET_LOGGED_IN };
};
