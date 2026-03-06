const express = require("express");
const cors = require("cors");
require("dotenv").config();

const http = require("http");

const connectDB = require("./config/db");
const { initSocket } = require("./socket/socket");
const startForexStream = require("./services/forexStream");


// Routes
const authRoutes = require("./routes/authRoutes");
const channelRoutes = require("./routes/channelRoutes");
const messageRoutes = require("./routes/messageRoutes");
const forexRoutes = require("./routes/forexRoutes");

const app = express();

console.log("Starting server...");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/forex", forexRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Forex MERN Backend Running 🚀");
});

const startServer = async () => {
  try {
    // connect MongoDB
    await connectDB();

    const PORT = process.env.PORT || 5000;

    // create HTTP server
    const server = http.createServer(app);

    // initialize socket.io
    initSocket(server);
    
    startForexStream();

    // start server
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server failed:", error);
  }
};

startServer();