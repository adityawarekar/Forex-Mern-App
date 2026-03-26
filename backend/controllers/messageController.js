const Message = require("../models/Message");
const { getIO } = require("../socket/socket");

const sendMessage = async (req, res) => {
  try {
    const { message, channelId } = req.body;

    const newMessage = new Message({
      message,
      channelId,
      user: req.user.id
    });

    await newMessage.save();

    const populatedMessage = await newMessage.populate("user", "name email");

    const io = getIO();
    io.to(channelId).emit("newMessage", populatedMessage);

    res.status(201).json({
      message: "Message sent",
      data: populatedMessage
    });

  } catch (error) {
    console.error("Message Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getChannelMessages = async (req, res) => {
  try {
    const { channelId } = req.params;

    const messages = await Message.find({
      channelId,
      user: req.user.id 
    })
      .populate("user", "name email")
      .sort({ createdAt: 1 });

    res.json({ messages });

  } catch (error) {
    console.error("Fetch Messages Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { sendMessage, getChannelMessages };