import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để tự động đính kèm token (nếu có)
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lý lỗi response toàn cục
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.error("API Error:", error);
    return Promise.reject(error.response?.data || "An error occurred");
  }
);

export default axiosInstance;
