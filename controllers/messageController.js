const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  try {

    const { message, channelId } = req.body;

    const newMessage = new Message({
      message,
      channelId,
      user: req.user.id
    });

    await newMessage.save();

    res.status(201).json({
      message: "Message sent",
      data: newMessage
    });

  } catch (error) {
    console.error("Message Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { sendMessage };