const ForexUpdate = require("../models/ForexUpdate");
const { getIO } = require("../socket/socket");

const sendForexUpdate = async (req, res) => {
  try {

    const { pair, bid, ask } = req.body;

    const update = new ForexUpdate({
      pair,
      bid,
      ask
    });

    await update.save();

    const io = getIO();
    io.emit("forexUpdate", update);

    res.json({
      message: "Forex update broadcasted",
      update
    });

  } catch (error) {
    console.error("Forex update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { sendForexUpdate };