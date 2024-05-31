import axios from './axios.js';

export const getAllCreditRequests = () =>
    axios.get(`/api/v1/home/credit-requests/all`);

export const addCreditRequest = (request) =>
    axios.post(`/api/v1/home/credit-requests/add`, request);

export const getCreditAnalyticsRequest = (id) =>
    axios.get(`/api/v1/home/credit-requests/analytics/${id}`);