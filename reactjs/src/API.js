import axios from 'axios';

const API = axios.create({
	baseURL:
		process.env.API_URL ||
		'http://private-4f7f71-rubricyourcode.apary-mock.com',
});

export default API;
