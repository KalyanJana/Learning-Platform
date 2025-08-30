// src/utils/apiClient.ts
import axios from "axios";
import { useAuthStore } from "../store/authStore";

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

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (refreshing) {
        // Wait until refresh is done, then retry original request
        return new Promise((resolve) => {
          addSubscriber((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      refreshing = true;
      try {
        const { data } = await apiClient.post("/token/refresh"); // sends refresh token cookie
        const newAccessToken = data.accessToken;

        const setAccessToken = useAuthStore.getState().setAccessToken;
        setAccessToken(newAccessToken);

        // Update Authorization header for all future requests
        apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        onAccessTokenFetched(newAccessToken);
        refreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        refreshing = false;
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
