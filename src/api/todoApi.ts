import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const todoApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const refreshToken = async () => {
  const response = await todoApi.post("/api/auth/refresh");
  const newToken = response.data.access_token;
  localStorage.setItem("token", newToken);
  return newToken;
};

todoApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

todoApi.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Check if the error status is 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // Attempt token refresh
      if (!originalRequest._retry) {
        originalRequest._retry = true; // Avoid infinite loops
        try {
          const newToken = await refreshToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return todoApi(originalRequest); // Retry the original request
        } catch (refreshError) {
          localStorage.removeItem("token");
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);

export { todoApi };
