// src/utils/apiClient.ts
import axios from "axios";
import type { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

import { useAuthStore } from "../store/useAuthStore";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// ---------- Request interceptor handlers ----------

function authRequestSuccess(config: AxiosRequestConfig): AxiosRequestConfig {
  const token = useAuthStore.getState().accessToken;
  if (token && !config.headers?.Authorization) {
    if (!config.headers) config.headers = {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

function authRequestError(error: AxiosError) {
  return Promise.reject(error);
}

apiClient.interceptors.request.use(authRequestSuccess, authRequestError);

// ---------- Refresh helpers shared by response interceptor ----------

let refreshing = false;
let subscribers: Array<(token: string) => void> = [];

function onAccessTokenFetched(token: string) {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
}

function addSubscriber(callback: (token: string) => void) {
  subscribers.push(callback);
}

async function refreshAccessToken(): Promise<string> {
  const { data } = await apiClient.post("/token/refresh");
  const newAccessToken = data.accessToken as string;

  const { setAccessToken } = useAuthStore.getState();
  setAccessToken(newAccessToken);

  apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

  return newAccessToken;
}

// ---------- Response interceptor handlers ----------

async function authResponseSuccess<T>(response: AxiosResponse<T>) {
  return response;
}

async function authResponseError(error: AxiosError) {
  const originalRequest: any = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    if (refreshing) {
      return new Promise((resolve) => {
        addSubscriber((token: string) => {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(apiClient(originalRequest));
        });
      });
    }

    refreshing = true;
    try {
      const newAccessToken = await refreshAccessToken();

      onAccessTokenFetched(newAccessToken);
      refreshing = false;

      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return apiClient(originalRequest);
    } catch (err) {
      refreshing = false;
      useAuthStore.getState().clearAuth();
      return Promise.reject(err);
    }
  }

  return Promise.reject(error);
}

apiClient.interceptors.response.use(authResponseSuccess, authResponseError);

export default apiClient;
