"use client";

import { useState } from "react";
import {
  useNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotification,
} from "@/services/User/Notifications/notificationActions";
import { toast } from "@/lib/toast";
import { mutate } from "swr";
import {
  BellOff,
  CheckCheck,
  Trash2,
  Package,
  ShoppingCart,
  Star,
  CreditCard,
  Info,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const notifIconMap = {
  order: Package,
  payment: CreditCard,
  review: Star,
  cart: ShoppingCart,
  default: Info,
};

const NotifItem = ({ notif, onRefresh }) => {
  const { trigger: markRead } = useMarkAsRead();
  const { trigger: deleteNotif } = useDeleteNotification();
  const Icon = notifIconMap[notif.type] || notifIconMap.default;

  const handleRead = async () => {
    if (notif.is_read) return;
    try {
      await markRead({ id: notif.id });
      onRefresh();
    } catch {
      /* silently fail */
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await deleteNotif({ id: notif.id });
      toast.success("Notifikasi dihapus");
      onRefresh();
    } catch {
      toast.error("Gagal menghapus");
    }
  };

  return (
    <div
      onClick={handleRead}
      className={`flex items-start gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors group ${
        !notif.is_read ? "bg-green-50/50" : ""
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          !notif.is_read
            ? "bg-[#03AC0E]/10 text-[#03AC0E]"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${
            !notif.is_read ? "text-gray-900" : "text-gray-600"
          }`}
        >
          {notif.title}
        </p>
        {notif.body && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
            {notif.body}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-1">
          {formatDistanceToNow(new Date(notif.created_at), {
            addSuffix: true,
            locale: idLocale,
          })}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {!notif.is_read && (
          <div className="w-2 h-2 rounded-full bg-[#03AC0E]" />
        )}
        <button
          onClick={handleDelete}
          className="p-1 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export const NotificationDropdown = ({ trigger, notifCount }) => {
  const [unreadOnly, setUnreadOnly] = useState(false);

  const {
    data,
    isLoading,
    mutate: revalidate,
  } = useNotifications({
    unread_only: unreadOnly,
  });
  const { trigger: markAll, isMutating: isMarkingAll } = useMarkAllAsRead();

  const notifications = data || [];

  const handleMarkAll = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await markAll();
      toast.success("Semua notifikasi ditandai dibaca");
      revalidate();
      mutate("/v1/notifications/count");
    } catch {
      toast.error("Gagal memperbarui");
    }
  };

  const handleRefresh = () => {
    revalidate();
    mutate("/v1/notifications/count");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[360px] p-0 rounded-xl shadow-lg border border-gray-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-gray-900">Notifikasi</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {notifCount > 0
                ? `${notifCount} Belum dibaca`
                : "Semua sudah dibaca"}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setUnreadOnly(!unreadOnly);
              }}
              className={`text-[10px] px-2 py-1 rounded-full border transition-colors ${unreadOnly ? "bg-green-50 text-green-700 border-green-200" : "bg-white text-gray-500 border-gray-200"}`}
            >
              Belum dibaca
            </button>
            <button
              onClick={handleMarkAll}
              disabled={isMarkingAll}
              className="p-1 text-gray-400 hover:text-green-600 transition-colors"
              title="Tandai semua dibaca"
            >
              <CheckCheck size={16} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="max-h-[380px] overflow-y-auto overscroll-contain">
          {isLoading ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-3/4 animate-pulse" />
                    <div className="h-2 bg-gray-100 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : notifications?.data?.length === 0 ? (
            <div className="py-12 px-4 text-center">
              <BellOff size={24} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm font-medium text-gray-900">
                {unreadOnly ? "Semua sudah dibaca!" : "Belum ada notifikasi"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Notifikasi kamu akan muncul di sini
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {notifications?.data?.map((notif) => (
                <NotifItem
                  key={notif.id}
                  notif={notif}
                  onRefresh={handleRefresh}
                />
              ))}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
