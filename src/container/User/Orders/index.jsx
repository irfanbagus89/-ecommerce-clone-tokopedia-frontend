"use client";

import { useState } from "react";
import { useMyOrders } from "@/services/User/Orders/getMyOrders";
import { useConfirmOrder } from "@/services/User/Orders/confirmOrder";
import { useCancelOrder } from "@/services/User/Orders/cancelOrder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomPagination } from "@/components/ui/pagination";
import { toast } from "@/lib/toast";
import formatRupiah from "@/lib/utils/formatters";
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  ShoppingBag,
  Star,
  ChevronRight,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { mutate } from "swr";
import Image from "next/image";
import ReviewModal from "./Components/ReviewModal";

const statusConfig = {
  pending: {
    label: "Menunggu Pembayaran",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: Clock,
  },
  processing: {
    label: "Diproses Penjual",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: Package,
  },
  shipped: {
    label: "Dikirim",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    icon: Truck,
  },
  delivered: {
    label: "Terkirim",
    color: "bg-teal-100 text-teal-700 border-teal-200",
    icon: CheckCircle,
  },
  completed: {
    label: "Selesai",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Dibatalkan",
    color: "bg-red-100 text-red-700 border-red-200",
    icon: XCircle,
  },
};

const tabs = [
  { label: "Semua", value: "" },
  { label: "Belum Bayar", value: "pending" },
  { label: "Diproses", value: "processing" },
  { label: "Dikirim", value: "shipped" },
  { label: "Terkirim", value: "delivered" },
  { label: "Selesai", value: "completed" },
  { label: "Dibatalkan", value: "cancelled" },
];

const OrderCard = ({ order, onReview }) => {
  const cfg = statusConfig[order.status] || statusConfig.pending;
  const Icon = cfg.icon;

  const { trigger: confirm, isMutating: isConfirming } = useConfirmOrder(order.id);
  const { trigger: cancel, isMutating: isCancelling } = useCancelOrder(order.id);

  const handleConfirm = async () => {
    try {
      await confirm();
      toast.success("Pesanan dikonfirmasi diterima!");
      mutate((key) => Array.isArray(key) && key[0] === "/v1/orders/my-orders");
    } catch {
      toast.error("Gagal konfirmasi pesanan");
    }
  };

  const handleCancel = async () => {
    try {
      await cancel();
      toast.success("Pesanan berhasil dibatalkan");
      mutate((key) => Array.isArray(key) && key[0] === "/v1/orders/my-orders");
    } catch {
      toast.error("Gagal membatalkan pesanan");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Icon size={15} className="text-gray-500" />
          <span className="text-xs text-gray-500 font-medium">
            {order.invoice_number || `#${order.id.slice(0, 8).toUpperCase()}`}
          </span>
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color}`}
        >
          {cfg.label}
        </span>
      </div>

      {/* Items */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <ShoppingBag size={14} className="text-[#03AC0E]" />
          <span className="text-sm font-semibold text-gray-700">
            {order.store_name || "Toko"}
          </span>
        </div>

        {order.items?.slice(0, 2).map((item, i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.product_name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package size={20} className="text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.product_name}
              </p>
              <p className="text-xs text-gray-500">
                {item.variant_name && `Varian: ${item.variant_name} · `}
                {item.quantity}x {formatRupiah(item.price)}
              </p>
            </div>
          </div>
        ))}
        {order.items?.length > 2 && (
          <p className="text-xs text-gray-400 mt-1">
            +{order.items.length - 2} produk lainnya
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50">
        <div>
          <p className="text-xs text-gray-500">Total Pembayaran</p>
          <p className="text-base font-bold text-[#03AC0E]">
            {formatRupiah(order.total_price)}
          </p>
        </div>
        <div className="flex gap-2">
          {order.status === "pending" && (
            <Button
              size="sm"
              variant="outline"
              className="text-xs text-red-500 border-red-200 hover:bg-red-50"
              onClick={handleCancel}
              disabled={isCancelling}
            >
              {isCancelling ? "..." : "Batalkan"}
            </Button>
          )}
          {order.status === "delivered" && (
            <Button
              size="sm"
              className="text-xs bg-[#03AC0E] hover:bg-[#028a0b] text-white"
              onClick={handleConfirm}
              disabled={isConfirming}
            >
              {isConfirming ? "..." : "Konfirmasi Terima"}
            </Button>
          )}
          {order.status === "completed" && (
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-[#03AC0E] text-[#03AC0E] hover:bg-green-50"
              onClick={() => onReview(order)}
            >
              <Star size={12} className="mr-1" />
              Beri Ulasan
            </Button>
          )}
          <Link href={`/orders/${order.id}`}>
            <Button size="sm" variant="outline" className="text-xs">
              Detail <ChevronRight size={12} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const MyOrdersContainer = () => {
  const [activeTab, setActiveTab] = useState("");
  const [page, setPage] = useState(1);
  const [reviewOrder, setReviewOrder] = useState(null);

  const { data, isLoading } = useMyOrders({
    page,
    limit: 10,
    status: activeTab,
  });
console.log(data, "data orders");
  const orders = data?.data|| [];
  const totalPages = data?.totalPages || 1;

  const handleTabChange = (value) => {
    setActiveTab(value);
    setPage(1);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pesanan Saya</h1>
        <p className="text-sm text-gray-500 mt-1">
          Pantau status semua pesananmu di sini
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full bg-white border border-gray-200 rounded-xl p-1 h-auto flex flex-wrap gap-1 justify-start mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="text-xs px-3 py-1.5 rounded-lg data-[state=active]:bg-[#03AC0E] data-[state=active]:text-white transition-all"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-40 bg-gray-100 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Belum ada pesanan
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {activeTab
                  ? `Tidak ada pesanan dengan status ini`
                  : "Mulai belanja dan temukan produk favoritmu!"}
              </p>
              <Link href="/home">
                <Button className="bg-[#03AC0E] hover:bg-[#028a0b] text-white">
                  Mulai Belanja
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onReview={setReviewOrder}
                />
              ))}
              <CustomPagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                siblingCount={1}
                className="justify-center mt-6"
              />
            </div>
          )}
        </TabsContent>
      </Tabs>

      {reviewOrder && (
        <ReviewModal
          order={reviewOrder}
          onClose={() => setReviewOrder(null)}
        />
      )}
    </div>
  );
};

export default MyOrdersContainer;
