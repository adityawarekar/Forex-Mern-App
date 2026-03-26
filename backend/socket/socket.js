const { Server } = require("socket.io");

let io;

const initSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinChannel", (channelId) => {
      socket.join(channelId);
      console.log("User joined channel:", channelId);
    });

    // 🔥 TYPING WITH NAME
    socket.on("typing", ({ channelId, name }) => {
      socket.to(channelId).emit("typing", name);
    });

    socket.on("stopTyping", (channelId) => {
      socket.to(channelId).emit("stopTyping");
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = {
  initSocket,
  getIO
};