import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "../store/authStore";
import apiClient from "../utils/apiClient";

let socket: Socket | null = null;

export default function useSocket(userId: string | null) {
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    console.log("useSocket hook triggered, userId:", userId);

    if (!userId) {
      if (socket) {
        console.log("Disconnecting existing socket due to no userId");
        socket.disconnect();
        socket = null;
      }
      return;
    }

    console.log("Connecting socket...");
    socket = io("http://localhost:4000", { withCredentials: true });

    socket.on("connect", () => {
      console.log("Connected to WebSocket, socket id:", socket.id);
      socket.emit("registerUser", userId);
      console.log("Emitted registerUser with userId:", userId);
    });

    socket.on("forceLogout", async() => {
      alert("You have been logged out due to another login.");
      // Optional: Call backend /logout endpoint to clear the refresh token from cookie
      try {
        console.log("calling log out handler...")
        await apiClient.post("/users/v1/logout"); // Ensure backend expires refreshToken cookie
        console.log("logout completed...")
        logout();
        // if(window.location.href !== "/"){
        //   window.location.href = "/";
        // }
      } catch(error) {
        console.log("Error logging out:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });

    return () => {
      console.log("Cleaning up socket...");
      socket.disconnect();
      socket = null;
    };
  }, [userId, logout]);
}
