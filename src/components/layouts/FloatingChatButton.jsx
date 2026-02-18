"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Search, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

/* =========================
   DUMMY DATA
   ========================= */
const chatsDummy = [
  {
    id: 1,
    name: "Budi Santoso",
    lastMessage: "Kak, stok masih ada?",
    online: true,
    unread: 2,
    messages: [
      { from: "buyer", text: "Halo kak", time: "10:30" },
      { from: "seller", text: "Halo, ada yang bisa dibantu?", time: "10:31" },
      { from: "buyer", text: "Kak, stok masih ada?", time: "10:32" },
      { from: "buyer", text: "Saya mau order 1 pcs", time: "10:33" },
    ],
  },
  {
    id: 2,
    name: "Siti Rahayu",
    lastMessage: "Bisa kirim hari ini?",
    online: false,
    unread: 1,
    messages: [
      { from: "buyer", text: "Halo kak", time: "09:15" },
      { from: "seller", text: "Halo kak", time: "09:20" },
      { from: "buyer", text: "Bisa kirim hari ini?", time: "09:25" },
    ],
  },
  {
    id: 3,
    name: "Ahmad Wijaya",
    lastMessage: "Terima kasih kak",
    online: true,
    unread: 0,
    messages: [
      { from: "buyer", text: "Barang sudah sampai", time: "08:00" },
      { from: "seller", text: "Alhamdulillah, semoga puas", time: "08:05" },
      { from: "buyer", text: "Terima kasih kak", time: "08:10" },
    ],
  },
];

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(chatsDummy[0]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const filteredChats = chatsDummy.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalUnread = chatsDummy.reduce((sum, chat) => sum + chat.unread, 0);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      from: "seller",
      text: message,
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setActiveChat((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      lastMessage: message,
    }));

    setMessage("");
  };

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat.messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Panel */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[500px] h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-linear-to-r from-[#03AC0E] to-[#028a0b] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">
                  Chat Pembeli
                </h3>
                <p className="text-white/80 text-xs">
                  {filteredChats.length} chat aktif
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="text-white" size={16} />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Chat List */}
            <div className="w-40 border-r border-gray-100 flex flex-col bg-gray-50">
              <div className="p-2">
                <div className="relative">
                  <Input
                    placeholder="Cari..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-8 text-xs"
                    rightIcon={
                      <Search
                        className=" text-gray-400"
                        size={14}
                      />
                    }
                  />
                </div>
              </div>
              <div className="flex-1 overflow-auto space-y-1 p-2">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setActiveChat(chat)}
                    className={`p-2 rounded-lg cursor-pointer transition ${
                      activeChat.id === chat.id
                        ? "bg-[#03AC0E] text-white"
                        : "hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback
                            className={`text-xs ${
                              activeChat.id === chat.id
                                ? "bg-white/20 text-white"
                                : "bg-[#03AC0E] text-white"
                            }`}
                          >
                            {chat.name?.[0] ?? "U"}
                          </AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs font-medium truncate ${
                            activeChat.id === chat.id
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                        >
                          {chat.name}
                        </p>
                        <p
                          className={`text-[10px] truncate ${
                            activeChat.id === chat.id
                              ? "text-white/80"
                              : "text-gray-500"
                          }`}
                        >
                          {chat.lastMessage}
                        </p>
                      </div>
                      {chat.unread > 0 && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            activeChat.id === chat.id
                              ? "bg-white text-[#03AC0E]"
                              : "bg-[#03AC0E] text-white"
                          }`}
                        >
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 flex flex-col bg-white">
              {/* Active Chat Header */}
              <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#03AC0E] text-white text-xs">
                      {activeChat.name?.[0] ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {activeChat.name}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {activeChat.online ? (
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Online
                        </span>
                      ) : (
                        "Offline"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-3 overflow-auto space-y-2 bg-gray-50">
                {activeChat.messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.from === "seller" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded-2xl max-w-[80%] text-xs ${
                        msg.from === "seller"
                          ? "bg-linear-to-br from-[#03AC0E] to-[#028a0b] text-white rounded-br-md"
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p
                        className={`text-[9px] mt-1 ${
                          msg.from === "seller"
                            ? "text-white/70"
                            : "text-gray-400"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-gray-100">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ketik pesan..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 text-xs"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className="w-10 h-10 bg-linear-to-br from-[#03AC0E] to-[#028a0b] hover:from-[#028a0b] hover:to-[#027009] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg shadow-green-200"
                  >
                    <Send className="text-white" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen
            ? "bg-gray-600 hover:bg-gray-700"
            : "bg-linear-to-br from-[#03AC0E] to-[#028a0b] hover:shadow-green-300/50"
        }`}
      >
        {/* Ripple Effect */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#03AC0E]"></span>

        {/* Badge */}
        {!isOpen && totalUnread > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
            <span className="text-white text-xs font-bold">{totalUnread}</span>
          </span>
        )}

        {isOpen ? (
          <X className="text-white" size={24} />
        ) : (
          <MessageCircle className="text-white" size={24} />
        )}

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Chat Pembeli
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingChatButton;
