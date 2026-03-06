import { useState, useEffect } from "react";
import axios from "axios";
import socket from "../socket/socket";

function ChatBox({ channelId = "default-channel" }) {

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {

    socket.emit("joinChannel", channelId);

    socket.on("newMessage", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

  }, [channelId]);

  const sendMessage = async () => {

    if (!text) return;

    await axios.post(
      "http://localhost:5000/api/messages/send",
      {
        message: text,
        channelId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setText("");
  };

  return (
    <div className="bg-gray-950 p-6 rounded-lg h-full flex flex-col">

      <h2 className="text-lg font-semibold mb-4">
        Trader Chat
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2 text-sm text-gray-300">

        {messages.map((msg, i) => (
          <p key={i}>
            <span className="font-bold text-white">
              {msg.user?.name}:
            </span> {msg.message}
          </p>
        ))}

      </div>

      <div className="mt-4 flex gap-2">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="flex-1 bg-black border border-gray-700 rounded px-3 py-2 outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-white text-black px-4 py-2 rounded font-semibold"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatBox;