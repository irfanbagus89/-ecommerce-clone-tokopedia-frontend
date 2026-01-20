const ChatListItem = ({ chat, activeId, onClick }) => {
  return (
    <div
      onClick={() => onClick(chat)}
      className={`p-3 rounded cursor-pointer transition ${
        activeId === chat.id ? "bg-green-50" : "hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="font-medium">{chat.name}</p>
        {chat.online && (
          <span className="text-xs text-green-600">Online</span>
        )}
      </div>
      <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
    </div>
  );
};

export default ChatListItem;
