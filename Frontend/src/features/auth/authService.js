import axiosInstance from '../../utils/axiosConfig';

const API_URL = '/auth/';

// Register User
const register = async (userData) => {
  const response = await axiosInstance.post(API_URL + 'register', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    console.log(" User Registered Successfully");
    console.log("👤 User:", response.data.user || response.data)
  }
  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axiosInstance.post(API_URL + 'login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    console.log(" User Logged In Successfully");
    console.log("👤 User:", response.data.user || response.data)
  }
  return response.data;
};

// Logout
const logout = () => {
  localStorage.removeItem('user');
};

const authService = { register, login, logout };
export default authService;