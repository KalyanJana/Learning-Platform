// // src/store/authStore.ts
// import { create } from "zustand";
// import { devtools } from "zustand/middleware";

// interface AuthUser {
//   id: string;
//   email: string;
//   username?: string;
//   role?: "admin" | "student" | "staff";  // add role for admin check
// }

// interface AuthState {
//   user: AuthUser | null;
//   accessToken: string | null;
//   isAuthenticated: boolean;
//   setAccessToken: (token: string | null) => void;
//   setUser: (user: AuthUser | null) => void;
//   login: (token: string, user: AuthUser) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>(
//   devtools((set) => ({
//     user: null,
//     accessToken: null,
//     isAuthenticated: false,

//     setUser: (user) => set({ user }),

//     setAccessToken: (token) =>
//       set({
//         accessToken: token,
//         isAuthenticated: !!token,
//       }),

//     login: (accessToken, user) => {
//       set({
//         accessToken,
//         user,
//         isAuthenticated: true,
//       });
//     },

//     logout: () =>
//       set({
//         user: null,
//         accessToken: null,
//         isAuthenticated: false,
//       }),
//   }), { name: "AuthStore" })
// );

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  id: string | null;
  email: string | null;
  name: string | null;
  role: "admin" | "student" | "staff" | null;
  rewardPoints: number;
  referralCode: string | null;
  isAuthenticated: boolean;
  setAuth: (
    accessToken: string | null,
    id: string | null,
    email: string | null,
    name: string | null,
    role: AuthState["role"],
    rewardPoints?: number,
    referralCode?: string,
  ) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      accessToken: null,
      id: null,
      email: null,
      name: null,
      role: null,
      rewardPoints: 0,
      referralCode: null,
      isAuthenticated: false,

      setAuth: (
        accessToken,
        id,
        email,
        name,
        role,
        rewardPoints = 0,
        referralCode = null,
      ) =>
        set({
          accessToken: accessToken,
          id,
          email,
          name,
          role,
          rewardPoints,
          referralCode,
          isAuthenticated: !!accessToken,
        }),

      clearAuth: () =>
        set({
          accessToken: null,
          id: null,
          email: null,
          role: null,
          name: null,
          rewardPoints: 0,
          referralCode: null,
          isAuthenticated: false,
        }),
    }),
    { name: "AuthStore" },
  ),
);
