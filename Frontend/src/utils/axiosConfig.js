import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  import.meta.env.VITE_API_URL
});

// Interceptor: Attach Token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;