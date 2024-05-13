import axios from './axios.js';

export const getAccountRequest = () =>
    axios.get(`/api/v1/home/`);

export const getAllAccountsRequest = () =>
    axios.get(`/api/v1/home/all`);

export const deleteAccountRequest = (id) =>
    axios.delete(`/api/v1/home/${id}`);

export const updateAccountRequest = (account) =>
    axios.delete(`/api/v1/home/update/${account.id}`, account);