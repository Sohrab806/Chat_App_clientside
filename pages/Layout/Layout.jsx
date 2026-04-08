import { UserOutlined, SendOutlined, SearchOutlined, InfoCircleOutlined, CloseOutlined, PhoneOutlined, MailOutlined, CalendarOutlined ,SettingOutlined} from "@ant-design/icons";
import { useState } from "react";
import Chatcard from "./Chatcard";
import LayoutChatcard from "./LayoutChatcard";
import { useAuth } from "../Context/auth.context";
import FriendsCard from "./FriendsCard";


export default function Layout({ children, message, setMessage, onSend,
  conversations, onSelectConv, activeConv }) {
    const {user,logout,receiverdata}=useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chats");
  console.log('data in layout',receiverdata)

  return (
    <div className="flex h-screen bg-gray-100  gap-0">

      {/* Overlay — mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full z-50 bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0 md:w-64 md:shrink-0 md:mr-3 w-64
      `}>

        {/* User profile */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center shrink-0">
              <UserOutlined className="text-xl text-white" />
            </div>
            <div>
              <h1 className="text-sm font-medium leading-tight">{user?.name}</h1>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                Active
                <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full" />
              </p>
            </div>
            <button className="ml-auto text-gray-400 hover:text-gray-600 transition">
              <SearchOutlined className="text-lg " />
            </button>
          </div>
        </div>
        <section>
          <div className=" flex justify-around bg-white border border-gray-200 p-1 rounded-2xl">
            <button onClick={()=>setActiveTab("chats")} className={`${activeTab === "chats" ? "bg-blue-400 text-white" : ""} text-gray-400 w-15  h-6 rounded-full text-xs`}>chats</button>
            <button onClick={()=>setActiveTab("friends")} className={`${activeTab === "friends" ? "bg-blue-400 text-white" : ""} text-gray-400 w-15 h-6 rounded-full text-xs`}>friends</button>
            <button onClick={()=>setActiveTab("groups")} className={`${activeTab === "groups" ? "bg-blue-400 text-white" : ""} text-gray-400 w-15 h-6 rounded-full text-xs`}>groups</button>
          </div>
        </section>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto p-3">
         {activeTab === "chats" && <LayoutChatcard  conversations={conversations}
         userId={user?._id}
         onSelectConv={onSelectConv}
         activeConv={activeConv} />}
          {activeTab === "chats" && <Chatcard/> }
          {activeTab === "friends" && <><FriendsCard/></>}
          {activeTab === "groups" && <><div className="flex justify-center items-center text-gray-400">no Group yet</div></>}
          
        </div>

        <div className=" border-t border-gray-200">
          <div className=" p-3 flex justify-between">
            <button className="text-white w-20 h-10 rounded bg-blue-400">
              signout
            </button>
           <SettingOutlined className="text-lg text-gray-400"/>
          
          </div>
        </div>

      </aside>

      {/* Right side */}
      <div className="flex-1 flex min-w-0 gap-3">

        {/* Chat column */}
        <div className="flex-1 flex flex-col min-w-0 gap-3">

          {/* Navbar */}
          <nav className="h-14 shrink-0 bg-white shadow-2xl rounded flex items-center px-4 gap-3">

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-gray-600 hover:text-gray-900 transition"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Chat contact info in navbar */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center shrink-0">
                <UserOutlined className="text-sm text-white" />
              </div>
              <div>
                <p className="text-sm font-medium leading-tight">{receiverdata?.name}</p>
                <p className="text-xs text-gray-400">{receiverdata?.status}</p>
              </div>
            </div>

            {/* Info toggle button */}
            <button
              className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition
                ${infoOpen
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              onClick={() => setInfoOpen(!infoOpen)}
            >
              <InfoCircleOutlined />
              Info
            </button>

          </nav>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto bg-white shadow-2xl rounded p-4 min-h-0">
            {children}
          </main>

          {/* Message input — only shown when chat is active */}
          {onSend && (
          <div className="shrink-0 bg-white shadow-2xl rounded px-4 py-3 flex items-center gap-3">
            <input
              type="text"
              value={message ?? ""}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 transition"
            />
            <button
              onClick={onSend}
              className="w-9 h-9 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center shrink-0 transition"
            >
              <SendOutlined className="text-sm" />
            </button>
          </div>
          )}

        </div>

        {/* Info panel backdrop */}
        {infoOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setInfoOpen(false)}
          />
        )}

        {/* Info panel — slides in from right as overlay */}
        <div className={`
          fixed top-0 right-0 h-full z-50 w-72 bg-white shadow-2xl flex flex-col overflow-hidden
          transform transition-transform duration-300 ease-in-out
          ${infoOpen ? "translate-x-0" : "translate-x-full"}
        `}>

          {/* Info header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
            <h2 className="text-sm font-semibold text-gray-800">Contact Info</h2>
            <button
              onClick={() => setInfoOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <CloseOutlined />
            </button>
          </div>

          {/* Info scrollable body */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">

            {/* Avatar + name */}
            <div className="flex flex-col items-center gap-2 pt-2">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <UserOutlined className="text-2xl text-white" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-800">{receiverdata?.name}</p>
                <p className="text-xs text-green-500 flex items-center justify-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full" />
                  {receiverdata?.status}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100" />

            {/* Info rows */}
            <div className="flex flex-col gap-3">

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <MailOutlined className="text-sm text-gray-500" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Email</p>
                  <p className="text-xs text-gray-700">{receiverdata?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <PhoneOutlined className="text-sm text-gray-500" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Phone</p>
                  <p className="text-xs text-gray-700">{receiverdata?.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <CalendarOutlined className="text-sm text-gray-500" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Joined</p>
                  <p className="text-xs text-gray-700">  {receiverdata?.createdAt
                    ? new Date(receiverdata.createdAt).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : "—"}
                  </p>
                </div>
              </div>

            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100" />

            {/* Shared media placeholder */}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Shared Media</p>
              <div className="grid grid-cols-3 gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-lg" />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}