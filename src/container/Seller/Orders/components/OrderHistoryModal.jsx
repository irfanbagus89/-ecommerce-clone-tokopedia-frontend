"use client";

import { useOrderHistory } from "@/services/Seller/Orders/sellerOrderActions";
import { X, History, CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id as idLocale } from "date-fns/locale";

const statusLabel = {
  pending: "Menunggu Pembayaran",
  processing: "Diproses",
  shipped: "Dikirim",
  delivered: "Terkirim",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-teal-100 text-teal-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const OrderHistoryModal = ({ order, onClose }) => {
  const { data: history, isLoading } = useOrderHistory(order.id);
  const entries = history || [];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <History size={18} className="text-gray-600" />
            <h2 className="text-base font-bold text-gray-900">Riwayat Status</h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        <div className="p-5">
          <p className="text-xs text-gray-500 mb-4">
            #{order.invoice_number || order.id.slice(0, 8).toUpperCase()}
          </p>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
                    <div className="h-2.5 bg-gray-100 rounded animate-pulse w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : entries.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6">
              Belum ada riwayat status
            </p>
          ) : (
            <div className="relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100" />
              <div className="space-y-4">
                {entries.map((entry, i) => (
                  <div key={i} className="flex items-start gap-4 relative">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${
                        statusColor[entry.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <CheckCircle size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {statusLabel[entry.status] || entry.status}
                      </p>
                      {entry.note && (
                        <p className="text-xs text-gray-500">{entry.note}</p>
                      )}
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {formatDistanceToNow(new Date(entry.created_at), {
                          addSuffix: true,
                          locale: idLocale,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryModal;
