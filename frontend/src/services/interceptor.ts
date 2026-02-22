import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/v1/api",
  withCredentials: true,
});

/**
 * Attach Access Token Automatically
 */
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("auth_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

/**
 * Auto Refresh On 401
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // 🔥 Use SAME axios instance
        const response = await api.post("/auth/refresh", {
          refreshToken,
        });

        const newAccessToken = response.data.data.accessToken;

        // Store new token
        localStorage.setItem("auth_token", newAccessToken);

        // Update header for retry
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry original request
        return api(originalRequest);

      } catch (refreshError) {
        // Refresh failed → logout
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;