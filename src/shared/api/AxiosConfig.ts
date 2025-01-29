import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default axiosInstance;
