import axios from 'axios';

const API = axios.create({
	baseURL:
		process.env.API_URL ||
		'https://private-1f073b-swapemon.apiary-mock.com',
});

export default API;
