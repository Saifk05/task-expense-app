import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { environment } from "../config/environment";

const api = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

//  Attach token automatically
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("auth_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const ApiService = {
  // ================= AUTH =================

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
    console.log("Logout API failed, clearing tokens anyway");
  }

  await AsyncStorage.removeItem("auth_token");
  await AsyncStorage.removeItem("refresh_token");
},

  async refreshToken() {
    const refreshToken = await AsyncStorage.getItem("refresh_token");

    const response = await api.post("/auth/refresh", {
      refreshToken,
    });

    const newAccessToken = response.data.data.accessToken;

    await AsyncStorage.setItem("auth_token", newAccessToken);

    return response.data;
  },

  // ================= PROFILE =================

  async updateProfile(data: any) {
    const response = await api.patch("/users/profile", data);
    return response.data;
  },

  async uploadProfileImage(image: any) {
    const formData = new FormData();

    formData.append("image", {
      uri: image.uri,
      name: "profile.jpg",
      type: "image/jpeg",
    } as any);

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
  },
};
