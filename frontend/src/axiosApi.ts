import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:8000/',
});

axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosApi;
