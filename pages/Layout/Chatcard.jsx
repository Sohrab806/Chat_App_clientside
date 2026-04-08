import Avatar from "antd/es/avatar/Avatar"
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";

export default function Chatcard(){

    const [active, setActive] = useState(false);
    const conversations = [
  { id: 1, name: "Alice Chen", msg: "Are we still on for tonight?", time: "2m", avatar: "AC", online: true, unread: 2 },
  { id: 2, name: "Design Team", msg: "New mockups are ready 🎨", time: "14m", avatar: "DT", online: true, unread: 0 },
  { id: 3, name: "Marcus Reid", msg: "Just sent the files over", time: "1h", avatar: "MR", online: false, unread: 0 },
  { id: 4, name: "Sara Lopes", msg: "Thanks for the help!", time: "3h", avatar: "SL", online: true, unread: 0 },
  { id: 5, name: "Dev Sprint", msg: "Build passed ✅", time: "5h", avatar: "DS", online: false, unread: 5 },
  { id: 6, name: "Noah Kim", msg: "Can you review this?", time: "1d", avatar: "NK", online: false, unread: 0 },
];

    return(
        <>
        <div>
            {conversations.map((conv) => (
                <div key={conv.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer">
                    <Avatar size={40} icon={<UserOutlined/>} />
                    <div className="flex-1">
                        <h1 className="text-sm font-medium leading-tight">{conv.name}</h1>
                        <p className="text-xs text-gray-400">{conv.msg}</p>
                    </div>
                </div>
            ))}
        </div>
        
        </>
    )
}