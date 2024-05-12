import axios from './axios.js';

export const registerRequest = (account) =>
  axios.post('/api/v1/sign-up', account);

export const loginRequest = async (user) =>
   axios.post('/api/v1/login', user);

export const verifyTokenRequest = async (token) =>
  axios.get('/api/v1/refresh', token);