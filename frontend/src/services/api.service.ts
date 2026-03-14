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
},

async getUserOverview() {
  const response = await api.get("/user/overview");
  return response.data;
},

async searchLocation(name: string) {
  const response = await api.post("/user/address/search", { name });
  return response.data;
},

async reverseGeocode(lat: number, lng: number) {
  const response = await api.get("/user/address/reverse", {
    headers: {
      coords: `${lat},${lng}`,
    },
  });

  return response.data;
},

async getUserAddress() {
  const response = await api.get("/user/address");
  return response.data;
},

async changePassword(currentPassword: string, newPassword: string) {
  const response = await api.patch("/user/change-password", {
    currentPassword,
    newPassword,
  });

  return response.data;
},


async updateAddress(data: {
  address: string;
  building?: string;
  locality?: string;
  city: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
}) {
  const response = await api.put("/user/address", data);
  return response.data;
},


// async changePassword(currentPassword: string, newPassword: string) {
//   const response = await api.patch("/user/change-password", {
//     currentPassword,
//     newPassword,
//   });

//   return response.data;
// },

// ================= NOTIFICATIONS =================

async getNotifications(cursor?: string, limit = 10) {
  const response = await api.get("/notifications", {
    params: { cursor, limit },
  });
  return response.data;
},

async getUnreadNotificationCount() {
  const response = await api.get(
    "/notifications/unread-count"
  );
  return response.data;
},

async markNotificationAsRead(notificationId: string) {
  const response = await api.patch(
    `/notifications/${notificationId}/read`
  );
  return response.data;
},

async markAllNotificationsAsRead() {
  const response = await api.patch(
    "/notifications/read-all"
  );
  return response.data;
},

async deleteNotification(notificationId: string) {
  const response = await api.delete(
    `/notifications/${notificationId}`
  );
  return response.data;
},

// ================= TASKS =================

// Create Task
async createTask(data: {
  title: string;
  description?: string;
  categoryId: string;
  subCategoryId?: string;
  amount?: number;
  date?: string;
}) {
  const response = await api.post("/task/create-task", data);
  return response.data;
},

// ================= TASK DASHBOARD =================

async getTaskDashboard(params?: {
  weekStart?: string;
  weekEnd?: string;
}) {
  const response = await api.get("/task/dashboard", {
    params,
  });

  return response.data;
},

// Update Task
async updateTask(id: string, data: any) {
  const response = await api.patch(`/task/${id}`, data);
  return response.data;
},

// Get All Tasks
async getTasks(params?: {
  limit?: number;
  cursor?: string;
  status?: string;
  priority?: string;
  categoryId?: string;
  summary?: boolean;
}) {
  const response = await api.get("/task", {
    params,
  });

  return response.data;
},

// Create Task Category (Admin use mostly)
async createTaskCategory(data: {
  name: string;
  parentId?: string; //  REQUIRED for subcategory
  icon?: string;     // only for parent
  color?: string;    // only for parent
}) {
  const response = await api.post("/task/category", data);
  return response.data;
},

// Get Task Categories
async getTaskCategories() {
  const response = await api.get("/task/category");
  return response.data;
},


// Delete Task Category
async deleteTaskCategory(id: string) {
  const response = await api.delete(`/task/category/${id}`);
  return response.data;
},


// ================= SECURITY =================

async toggleMfa(isMfaEnabled: boolean) {
  const response = await api.patch("/user/mfa", {
    isMfaEnabled,
  });

  return response.data;
},


// ================= PRODUCTIVITY =================

async getProductivitySummary() {
  const response = await api.get("/productivity/summary");
  return response.data;
},

// ================= PRODUCTIVITY TASK LISTS =================

async getPendingTasks(cursor?: string, limit: number = 10) {
  const response = await api.get(
    "/productivity/tasks/pending",
    {
      params: { cursor, limit },
    }
  );

  return response.data;
},

async getOverdueTasks(cursor?: string, limit: number = 10) {
  const response = await api.get(
    "/productivity/tasks/overdue",
    {
      params: { cursor, limit },
    }
  );

  return response.data;
},

async getCompletedTasks(cursor?: string, limit: number = 10) {
  const response = await api.get(
    "/productivity/tasks/completed",
    {
      params: { cursor, limit },
    }
  );

  return response.data;
},

async getCancelledTasks(cursor?: string, limit: number = 10) {
  const response = await api.get(
    "/productivity/tasks/cancelled",
    {
      params: { cursor, limit },
    }
  );

  return response.data;
},

async getInProgressTasks(cursor?: string, limit: number = 10) {
  const response = await api.get(
    "/productivity/tasks/in-progress",
    {
      params: { cursor, limit },
    }
  );

  return response.data;
},

// ================= EXPENSE CATEGORIES =================

// Create Category
// async createCategory(data: {
//   name: string;
//   type: "INCOME" | "EXPENSE";
//   icon?: string;
//   color?: string;
// }) {
//   const response = await api.post("/categories", data);
//   return response.data;
// },


async createCategory(data: {
  name: string;
}) {
  const response = await api.post("/categories", data);
  return response.data;
},

// Create SubCategory
async createSubCategory(
  categoryId: string,
  data: {
    name: string;
    icon?: string;
    color?: string;
  }
) {
  const response = await api.post(
    `/categories/${categoryId}/subcategories`,
    data
  );

  return response.data;
},

// Get Category Tree
async getCategories() {
  const response = await api.get("/categories");
  return response.data;
},

// Update Category
async updateCategory(
  id: string,
  data: {
    name?: string;
    icon?: string;
    color?: string;
  }
) {
  const response = await api.patch(`/categories/${id}`, data);
  return response.data;
},

// Delete Category
async deleteCategory(id: string) {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
},


// ================= ACCOUNTS =================

// Get All Accounts
async getAccounts() {
  const response = await api.get("/accounts");
  return response.data;
},

// Create Account
async createAccount(data: {
  name: string;
  type?: string;
  balance?: number;
}) {
  const response = await api.post("/accounts", data);
  return response.data;
},

// Update Account
async updateAccount(
  id: string,
  data: {
    name?: string;
    type?: string;
    balance?: number;
  }
) {
  const response = await api.patch(`/accounts/${id}`, data);
  return response.data;
},

// Delete Account
async deleteAccount(id: string) {
  const response = await api.delete(`/accounts/${id}`);
  return response.data;
},

};

export default ApiService;