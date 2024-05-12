import axios from './axios.js';

export const getAccountRequest = (account) =>
    axios.get(`/api/v1/home/`, account);

export const getAllAccountsRequest = (account) =>
    axios.get(`/api/v1/home/all`, account);

export const deleteAccountRequest = (id) =>
    axios.delete(`/api/v1/home/${id}`);

export const updateAccountRequest = (account) =>
    axios.delete(`/api/v1/home/update/${account.id}`, account);