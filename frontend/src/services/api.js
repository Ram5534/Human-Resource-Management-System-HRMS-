import axios from "axios";

// const API_URL = "http://localhost:5000/";

const API_URL = "https://hrms-backend-3-0n5w.onrender.com/";

const api = axios.create({
  baseURL: API_URL,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
