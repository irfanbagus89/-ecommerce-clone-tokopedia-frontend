"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ChatListItem from "@/container/Seller/Chats/components/ChatListItem";
import ChatMessage from "@/container/Seller/Chats/components/ChatMessage";

/* =========================
   DUMMY DATA
========================= */
const chatsDummy = [
  {
    id: 1,
    name: "Budi",
    lastMessage: "Kak, stok masih ada?",
    online: true,
    messages: [
      { from: "buyer", text: "Halo kak" },
      { from: "seller", text: "Halo, ada yang bisa dibantu?" },
      { from: "buyer", text: "Kak, stok masih ada?" },
    ],
  },
  {
    id: 2,
    name: "Siti",
    lastMessage: "Bisa kirim hari ini?",
    online: false,
    messages: [
      { from: "buyer", text: "Halo" },
      { from: "seller", text: "Halo kak" },
      { from: "buyer", text: "Bisa kirim hari ini?" },
    ],
  },
];

/* =========================
   ChatPage
========================= */
const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(chatsDummy[0]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const filteredChats = chatsDummy.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = { from: "seller", text: message };

    setActiveChat((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

    setMessage("");
  };

  return (
    <div className="p-6 h-[calc(100vh-64px)]">
      <h1 className="text-2xl font-bold mb-4">Chat Pembeli</h1>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 h-full">
        {/* CHAT LIST */}
        <Card className="p-4 flex flex-col">
          <Input
            placeholder="Cari chat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />

          <div className="flex-1 overflow-auto space-y-2">
            {filteredChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                activeId={activeChat.id}
                onClick={setActiveChat}
              />
            ))}
          </div>
        </Card>

        {/* CHAT WINDOW */}
        <Card className="flex flex-col">
          {/* HEADER */}
          <div className="p-4 border-b">
            <p className="font-semibold">{activeChat.name}</p>
            <p className="text-xs text-gray-500">
              {activeChat.online ? "Online" : "Offline"}
            </p>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 p-4 overflow-auto space-y-3 bg-gray-50">
            {activeChat.messages.map((msg, i) => (
              <ChatMessage key={i} msg={msg} />
            ))}
          </div>

          {/* INPUT */}
          <div className="p-4 border-t flex gap-2">
            <Input
              placeholder="Ketik pesan..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              onClick={sendMessage}
              className="bg-[#03AC0E] hover:bg-green-700"
            >
              Kirim
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;
