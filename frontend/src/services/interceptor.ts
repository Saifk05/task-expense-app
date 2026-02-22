import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { environment } from "../config/environment";

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

const api = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem("auth_token");

    console.log("📤 REQUEST:", config.url);
    console.log("🔑 Access token exists:", !!token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("❌ REQUEST ERROR:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("✅ RESPONSE SUCCESS:", response.config.url);
    return response;
  },
  async (error: AxiosError) => {
    console.log("🚨 RESPONSE ERROR:", error.response?.status);

    const originalRequest = error.config as
      | (AxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`,
            };
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refresh_token");

        console.log("🔁 Attempting refresh...");

        const response = await axios.post(
          `${environment.apiUrl}/auth/refresh`,
          { refreshToken }
        );

        const newAccessToken = response.data.data.accessToken;
        const newRefreshToken = response.data.data.refreshToken;

        await AsyncStorage.setItem("auth_token", newAccessToken);
        await AsyncStorage.setItem("refresh_token", newRefreshToken);

        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        await AsyncStorage.removeItem("auth_token");
        await AsyncStorage.removeItem("refresh_token");

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;