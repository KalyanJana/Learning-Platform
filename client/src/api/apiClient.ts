// src/utils/apiClient.ts
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // important to send HttpOnly cookies (refresh token)
});

// Request interceptor to set Authorization header if access token exists
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token && !config.headers?.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let refreshing = false;
let subscribers: ((token: string) => void)[] = [];

function onAccessTokenFetched(token: string) {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
}

function addSubscriber(callback: (token: string) => void) {
  subscribers.push(callback);
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest.url || "";

    // ❌ DO NOT refresh for auth endpoints
    const isAuthRoute =
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/token/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      if (refreshing) {
        return new Promise((resolve) => {
          addSubscriber((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      refreshing = true;
      try {
        const { data } = await apiClient.post("/users/token/refresh");

        const newAccessToken = data.accessToken;
        const { _id, email, name, role } = data.user;

        useAuthStore
          .getState()
          .setAuth(newAccessToken, _id, email, name, role);

        apiClient.defaults.headers.common.Authorization =
          `Bearer ${newAccessToken}`;

        onAccessTokenFetched(newAccessToken);
        refreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        refreshing = false;
        useAuthStore.getState().clearAuth();
        return Promise.reject(err);
      }
    }

    // ✅ IMPORTANT: reject for login errors
    return Promise.reject(error);
  }
);


export default apiClient;
