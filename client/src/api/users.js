import axios from './axios.js';

export const getUserRequest = (user) =>
    axios.get(`/api/v1/home/users/`, user);

export const addUserRequest = (user) =>
    axios.post(`/api/v1/home/users/add`, user);