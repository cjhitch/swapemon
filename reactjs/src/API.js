import axios from 'axios';

require('dotenv').config();

const API = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

export default API;
