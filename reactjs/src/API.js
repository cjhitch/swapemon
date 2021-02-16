import axios from 'axios';

require('dotenv').config();

const API = axios.create({
	baseURL: process.env.API_URL || 'http://localhost:5000',
});

export default API;
