const express = require("express");
const router = express.Router();

const { createChannel } = require("../controllers/channelController");
const Channel = require("../models/Channel");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createChannel);

/* GET ALL CHANNELS */
router.get("/", authMiddleware, async (req, res) => {
  try {

    const channels = await Channel.find();

    res.json(channels);

  } catch (error) {
    console.error("Fetch channels error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 DELETE CHANNEL
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const Channel = require("../models/Channel");

    await Channel.findByIdAndDelete(req.params.id);

    res.json({ message: "Channel deleted" });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;