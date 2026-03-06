const Channel = require("../models/Channel");

const createChannel = async (req, res) => {
  try {

    const { name, isPrivate } = req.body;

    const channel = new Channel({
      name,
      isPrivate,
      createdBy: req.user.id
    });

    await channel.save();

    res.status(201).json({
      message: "Channel created",
      channel
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createChannel };