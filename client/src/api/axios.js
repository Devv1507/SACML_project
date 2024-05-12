import axios from 'axios';

const PORT = process.env.NODE_ENV_PORT || 3000;
const API = `http://localhost:${PORT}`;

const instance = axios.create({
    baseURL: API,
    withCredentials: true
});

export default instance;
