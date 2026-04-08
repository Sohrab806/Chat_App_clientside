import Layout from "./Layout/Layout";
import Chat from "./Chat";
import { socket } from "../socket/socket";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./Context/auth.context";

export default function Home() {
  const { user, receiverId } = useAuth();
  const userId = user?._id || user?.id; // support both JWT formats
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/conversation/${userId}`)
      .then((res) => setConversations(res.data));
    console.log("conversations", conversations)
    console.log("receiverId", receiverId)

  }, [userId]);

  // When receiverId changes (user clicked message icon from FriendsCard)
  // → find existing conversation with that person and open it
  useEffect(() => {
    if (!receiverId || conversations.length === 0) {
      // No existing convos yet — clear chat, sendText will create one on first message
      setActiveChat(null);
      setMessages([]);
      return;
    }

    const existing = conversations.find((conv) =>
      conv.participants?.some((p) => String(p._id) === String(receiverId))
    );

    if (existing) {
      openConversation(existing); // loads messages automatically
    } else {
      // No conversation yet — clear chat ready for first message
      setActiveChat(null);
      setMessages([]);
    }
  }, [receiverId]);

  const openConversation = async (conv) => {
    setActiveChat(conv);
    try {
      console.log('convo',conv)
      const res = await axios.get(`http://localhost:3000/conversation/messages/${conv._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setMessages(res.data);
      console.log("messages loaded:", res.data);
    } catch (err) {
      console.error("Failed to load messages:", err.response?.data || err.message);
    }
  };

  const sendText = () => {
    if (!message) return;

    if (!activeChat && !receiverId) {
      console.warn("No active chat or receiver selected");
      return;
    }

    const tempMsg = {
      _id: Date.now(), // temporary id
      senderId: userId,
      message,
      conversationId: activeChat?._id,
      createdAt: new Date(),
    };

    // 🔥 instant UI update
    setMessages((prev) => [...prev, tempMsg]);

    socket.emit("send_message", {
      senderId: userId,
      receiverId:
        receiverId ||
        activeChat?.participants?.find(
          (p) => String(p._id) !== String(userId)
        )?._id,
      message,
      conversationId: activeChat?._id || null,
    });

    setMessage("");
  };

  useEffect(() => {
    const handleReceive = (data) => {
      // Ignore messages sent by yourself (optimistic UI already added them)
      if (String(data.senderId) === String(userId)) return;

      // Only add message if it belongs to the currently open conversation
      if (String(data.conversationId) === String(activeChat?._id)) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receive_message", handleReceive);

    return () => socket.off("receive_message", handleReceive); // remove only THIS listener
  }, [activeChat?._id, userId]);

  return (
    <Layout
      message={message}
      setMessage={setMessage}
      onSend={sendText}
      conversations={conversations}
      onSelectConv={openConversation}
      activeConv={activeChat}
    >
      <Chat messages={messages} setMessages={setMessages} userId={userId} /> {/* ✅ fixed typo */}
    </Layout>
  );
}