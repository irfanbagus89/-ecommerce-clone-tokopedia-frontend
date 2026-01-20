const ChatMessage = ({ msg }) => {
  return (
    <div
      className={`flex ${
        msg.from === "seller" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${
          msg.from === "seller" ? "bg-[#03AC0E] text-white" : "bg-white border"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
};

export default ChatMessage;
