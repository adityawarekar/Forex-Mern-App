const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");


// 🔹 REGISTER
router.post("/register", registerUser);


// 🔹 LOGIN
router.post("/login", loginUser);


// 🔹 GET CURRENT USER (PROFILE)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // req.user comes from token
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 UPDATE PROFILE
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    ).select("-password");

    res.json(user);

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;