import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
});


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});


apiClient.interceptors.response.use(
  (response) => {
    console.log("SUCCESS");
    console.log(response);
    return response;
  },
  (error) => {;
    console.log("ERROR");
    console.log(error);
    if (error.code === 'ERR_NETWORK') {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
