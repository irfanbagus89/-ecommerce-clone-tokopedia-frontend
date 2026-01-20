import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ChatListItem = ({ chat, activeId, onClick }) => {
  return (
    <div
      role="button"
      onClick={() => onClick(chat)}
      className={`p-3 rounded cursor-pointer transition ${
        activeId === chat.id ? "bg-green-50" : "hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar>
            {chat.avatar ? (
              <AvatarImage src={chat.avatar} alt={chat.name} />
            ) : (
              <AvatarFallback>{chat.name?.[0] ?? "U"}</AvatarFallback>
            )}
          </Avatar>

          <div>
            <p className="font-medium">{chat.name}</p>
            <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
          </div>
        </div>

        {chat.online && (
          <Badge variant="secondary" className="text-xs">
            Online
          </Badge>
        )}
      </div>
    </div>
  );
};

export default ChatListItem;
