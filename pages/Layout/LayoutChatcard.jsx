import Avatar from "antd/es/avatar/Avatar";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../Context/auth.context";
export default function LayoutChatcard({
  conversations,
  userId,
  onSelectConv,
  activeConv,
}) {
  const {receiverId,receiver}=useAuth()
  return (
    <div>
      {conversations?.length > 0 ? (
        conversations.map((conv) => {
          const other = conv.participants?.find(
            (p) => String(p._id) !== String(userId)
          );

          const isActive = activeConv?._id === conv._id;

          return (
            <div
              key={conv._id}
              onClick={() =>{ onSelectConv(conv) ; receiver(other) }}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
                ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}`}
            >
              <div className="relative shrink-0">
                <Avatar size={40} icon={<UserOutlined />} className="bg-gray-300" />

                {other?.status === "online" && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {other?.name ?? "Unknown"}
                </p>

                <p className="text-xs text-gray-400 truncate">
                  {conv.lastMessage?.message || "No messages yet"}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center text-gray-400">
          no chats yet
        </div>
      )}
    </div>
  );
}