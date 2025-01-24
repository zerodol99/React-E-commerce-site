import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com', // URL de base de l'API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
