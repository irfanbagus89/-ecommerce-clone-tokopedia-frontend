"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Search, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/AuthProvider";
import { 
  useConversations, 
  useMessages, 
  useSendMessage, 
  useUnreadChatCount 
} from "@/services/User/Chat/chatActions";
import { format } from "date-fns";

const FloatingChatButton = () => {
  const { user, isLoggedIn } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const { data: conversationsData, mutate: mutateConversations } = useConversations();
  const conversations = conversationsData || [];

  const { data: messagesData, isLoading: isLoadingMessages } = useMessages(activeChatId);
  const messages = messagesData?.data || [];

  const { data: unreadData } = useUnreadChatCount();
  const totalUnread = unreadData?.unread_count || 0;

  const { trigger: triggerSendMessage, isMutating: isSending } = useSendMessage();

  const formattedChats = conversations.map(c => {
    const isMeBuyer = user?.id === c.buyer_id;
    return {
      id: c.id,
      name: isMeBuyer ? c.store_name : c.buyer_name,
      avatar: isMeBuyer ? null : c.buyer_avatar,
      lastMessage: c.last_message,
      unread: c.unread_count,
      online: false, // Optional: Implement online status later if available
    };
  });

  const filteredChats = formattedChats.filter((chat) =>
    chat.name?.toLowerCase().includes(search.toLowerCase())
  );

  const activeChat = formattedChats.find(c => c.id === activeChatId);

  const handleSendMessage = async () => {
    if (!message.trim() || !activeChatId) return;

    try {
      await triggerSendMessage({
        conversationId: activeChatId,
        message: message,
      });
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const handleOpenChat = (event) => {
      setIsOpen(true);
      if (event.detail?.conversationId) {
        setActiveChatId(event.detail.conversationId);
      }
      mutateConversations();
    };

    window.addEventListener("chat:open", handleOpenChat);
    return () => window.removeEventListener("chat:open", handleOpenChat);
  }, [mutateConversations]);

  if (!isLoggedIn) return null;

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
                  Chat
                </h3>
                <p className="text-white/80 text-xs">
                  {filteredChats.length} chat
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
                    rightIcon={<Search className="text-gray-400" size={14} />}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-auto space-y-1 p-2">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className={`p-2 rounded-lg cursor-pointer transition ${
                      activeChatId === chat.id
                        ? "bg-[#03AC0E] text-white"
                        : "hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          {chat.avatar && <AvatarImage src={chat.avatar} />}
                          <AvatarFallback
                            className={`text-xs ${
                              activeChatId === chat.id
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
                            activeChatId === chat.id
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                        >
                          {chat.name}
                        </p>
                        <p
                          className={`text-[10px] truncate ${
                            activeChatId === chat.id
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
                            activeChatId === chat.id
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
              {activeChatId ? (
                <>
                  {/* Active Chat Header */}
                  <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        {activeChat?.avatar && <AvatarImage src={activeChat.avatar} />}
                        <AvatarFallback className="bg-[#03AC0E] text-white text-xs">
                          {activeChat?.name?.[0] ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {activeChat?.name}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {activeChat?.online ? (
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
                    {isLoadingMessages ? (
                      <div className="h-full flex items-center justify-center">
                        <Loader2 className="animate-spin text-gray-400" />
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-xs text-gray-400">
                        Belum ada pesan
                      </div>
                    ) : (
                      messages.map((msg) => {
                        const isMe = msg.sender_id === user?.id;
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`px-3 py-2 rounded-2xl max-w-[80%] text-xs ${
                                isMe
                                  ? "bg-linear-to-br from-[#03AC0E] to-[#028a0b] text-white rounded-br-md"
                                  : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                              }`}
                            >
                              <p>{msg.message}</p>
                              <p
                                className={`text-[9px] mt-1 ${
                                  isMe ? "text-white/70" : "text-gray-400"
                                }`}
                              >
                                {msg.created_at ? format(new Date(msg.created_at), "HH:mm") : ""}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-3 border-t border-gray-100">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ketik pesan..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1 text-xs"
                        disabled={isSending}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isSending}
                        className="w-10 h-10 bg-linear-to-br from-[#03AC0E] to-[#028a0b] hover:from-[#028a0b] hover:to-[#027009] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg shadow-green-200"
                      >
                        {isSending ? (
                          <Loader2 className="animate-spin text-white" size={16} />
                        ) : (
                          <Send className="text-white" size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
                  Pilih chat untuk memulai pesan
                </div>
              )}
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
            Chat
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingChatButton;
