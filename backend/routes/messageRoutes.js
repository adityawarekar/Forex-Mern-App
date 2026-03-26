const express = require("express");
const router = express.Router();

const { sendMessage, getChannelMessages } = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/send", authMiddleware, sendMessage);
router.get("/channel/:channelId", authMiddleware, getChannelMessages);

module.exports = router;