import axios from 'axios';

const PORT = process.env.PORT || process.env.SERVER_PORT;
const API = `http://localhost:${PORT}`;

export const registerRequest = (account) =>
  axios.post(`${API}/api/v1/home/sign-up`, account);
