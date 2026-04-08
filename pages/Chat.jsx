import { useEffect, useRef } from "react";
import { socket } from "../socket/socket";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function Chat({ messages, setMessages, userId }) {
  const bottomRef = useRef(null);

  // useEffect(() => {
  //   const handleConnect = () => console.log("Connected:", socket.id);
  //   socket.on("connect", handleConnect);
  //   socket.emit("join", { userId });
  //   socket.on("receive_message", (data) => {
  //     setMessages((prev) => [...prev, data]);
  //   });
  //   return () => {
  //     socket.off("connect", handleConnect);
  //     socket.off("receive_message");
  //   };
  // }, []);

  useEffect(() => {
    const handleConnect = () => console.log("Connected:", socket.id);
    socket.on("connect", handleConnect);
    if (userId) socket.emit("join", { userId });
    
    return () => {
      socket.off("connect", handleConnect);
    };
  }, [userId]);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-300 select-none gap-3">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <UserOutlined className="text-2xl text-gray-300" />
        </div>
        <p className="text-sm text-gray-400">No messages yet. Say hello 👋</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-2 py-2">
      {messages.map((msg, index) => {
        const isMe = String(msg.senderId) === String(userId);
        return (
          <div
            key={index}
            className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar — only for friend */}
            {!isMe && (
              <Avatar
                size={32}
                icon={<UserOutlined />}
                className="bg-gray-300 shrink-0 mb-1"
              />
            )}

            {/* Bubble group */}
            <div className={`flex flex-col gap-1 max-w-[70%] ${isMe ? "items-end" : "items-start"}`}>

              {/* Sender label */}
              <span className="text-xs text-gray-400 px-1">
                {isMe ? "You" : "Friend"}
              </span>

              {/* Message bubble */}
              <div
                className={`px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm
                  ${isMe
                    ? "bg-gray-800 text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                  }`}
              >
                {msg.message}
              </div>

              {/* Timestamp */}
              <span className="text-[10px] text-gray-300 px-1">
                {formatTime()}
              </span>

            </div>
          </div>
        );
      })}

      {/* Auto-scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
}