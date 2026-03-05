const express = require("express");
const cors = require("cors");
require("dotenv").config();


const connectDB = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");
const channelRoutes = require("./routes/channelRoutes");
const messageRoutes = require("./routes/messageRoutes");
const app = express();

console.log("Starting server...");

// middleware
app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Forex MERN Backend Running 🚀");
});

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server failed:", error);
  }
};

startServer();