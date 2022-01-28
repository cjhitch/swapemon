import axios from 'axios';

const API = axios.create({
	baseURL:
		process.env.NODE_ENV === 'production'
			? 'https://swapemon-stage.herokuapp.com/'
			: 'http://localhost:5000',
});

export default API;
