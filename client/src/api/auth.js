import axios from 'axios';

const PORT = process.env.NODE_ENV_PORT || 3000;
const API = `http://localhost:${PORT}`;

export const registerRequest = (account) =>
  axios.post(`${API}/api/v1/sign-up`, account);

export const loginRequest = async (user) =>
   axios.post(`${API}/api/v1/login`, user);