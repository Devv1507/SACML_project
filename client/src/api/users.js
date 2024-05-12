import axios from './axios.js';

export const getUserRequest = (user) =>
    axios.get(`/api/v1/home/users/`, user);