import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

const userSocketMap = new Map<string, Set<string>>();

export function setupSocketServer(httpServer: HttpServer) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL, // YOUR FRONTEND URL
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("Socket connected:", socket.id);

    // Client registers their userId upon connecting
    socket.on("registerUser", (userId: string) => {
      if (!userSocketMap.has(userId)) userSocketMap.set(userId, new Set());
      userSocketMap.get(userId)?.add(socket.id);
      console.log(`User ${userId} registered socket ${socket.id}`);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
      for (const [userId, sockets] of userSocketMap.entries()) {
        sockets.delete(socket.id);
        if (sockets.size === 0) userSocketMap.delete(userId);
      }
    });
  });

  // Notify all sockets for a user to logout asynchronously
  async function notifyUserLogout(userId: string): Promise<void> {
    const sockets = userSocketMap.get(userId);
    console.log("notifyUserLogout called for userId:", userId, "sockets:", sockets);

    if (!sockets || sockets.size === 0) {
      console.log(`No active sockets found for user ${userId}`);
      return;
    }

    // Emit forceLogout event to all sockets concurrently
    const emitPromises = Array.from(sockets).map((socketId) => {
      return new Promise<void>((resolve) => {
        io.to(socketId).emit("forceLogout");
        resolve();
      });
    });

    await Promise.all(emitPromises);
    console.log(`Notified forceLogout to all sockets for user ${userId}`);
  }

  return { io, notifyUserLogout };
}
