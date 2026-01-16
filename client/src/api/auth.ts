import apiClient from "./apiClient";

export interface LoginPayload {
  mobile: string;
  password: string;
  userType: "admin" | "student" | "staff";
}

export interface RegisterPayload {
  fullName: string;
  mobileNo: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: "admin" | "student" | "staff";
}

export const login = async (data: LoginPayload) => {
  const res = await apiClient.post("/users/v1/auth/login", data);
  return res.data;
};

  // apiClient.post("/users/v1/auth/login", data).then((res) => res.data);

export const register = (data: RegisterPayload) => {
  // if (data.password !== data.confirmPassword) {
  //   return Promise.reject(new Error("Passwords do not match!"));
  // }
  return apiClient.post("users/v1/auth/register", data).then((res) => res.data);
};

export const logout = () =>
  apiClient.post("/users/v1/logout").then((res) => res.data);

export const refreshAccessToken = async () => {
  // Request new access token (refresh token is sent via HttpOnly cookie)
  const response = await apiClient.post("users/v1/token/refresh");
  // Fetch latest profile with the new token already set via interceptor/cookie
  // const userResponse = await apiClient.get('users/v1/profile');
  // return {
  //   accessToken: data.accessToken,
  //   user: data.user,
  // };
  return response.data;
};
