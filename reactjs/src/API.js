import axios from 'axios';

require('dotenv').config();

const API = axios.create({
	baseURL:
		process.env.NODE_ENV === 'production'
			? 'https://swapemon.herokuapp.com/'
			: 'http://localhost:5000',
});

export default API;
