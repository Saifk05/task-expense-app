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

//
// ================= REQUEST INTERCEPTOR =================
//
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
  (error) => Promise.reject(error)
);

//
// ================= RESPONSE INTERCEPTOR =================
//
api.interceptors.response.use(
  (response) => {
    console.log("✅ RESPONSE:", response.config.url);
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

//
// ================= API SERVICE =================
//
export const ApiService = {
  async login(email: string, password: string) {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { accessToken, refreshToken } = response.data.data;

    await AsyncStorage.setItem("auth_token", accessToken);
    await AsyncStorage.setItem("refresh_token", refreshToken);

    return response.data;
  },

  async register(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string
  ) {
    const response = await api.post("/auth/register", {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    const { accessToken, refreshToken } = response.data.data;

    await AsyncStorage.setItem("auth_token", accessToken);
    await AsyncStorage.setItem("refresh_token", refreshToken);

    return response.data;
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log("Logout API failed");
    }

    await AsyncStorage.removeItem("auth_token");
    await AsyncStorage.removeItem("refresh_token");
  },

  async getCurrentUser() {
    const response = await api.get("/users/me");
    return response.data;
  },

  async updateProfile(data: any) {
    const response = await api.patch("/users/profile", data);
    return response.data;
  },

async uploadProfileImage(formData: FormData) {
  const response = await api.post(
    "/auth/upload-profile",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}
};

export default ApiService;