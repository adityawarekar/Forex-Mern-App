const express = require("express");
const router = express.Router();

const { sendForexUpdate } = require("../controllers/forexController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/update", authMiddleware, sendForexUpdate);

module.exports = router;