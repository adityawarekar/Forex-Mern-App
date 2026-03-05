const express = require("express");
const router = express.Router();

const { createChannel } = require("../controllers/channelController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createChannel);

module.exports = router;