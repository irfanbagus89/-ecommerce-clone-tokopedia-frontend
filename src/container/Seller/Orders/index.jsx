"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react";
import {
  useSellerOrders,
  useAcceptOrder,
  useShipOrder,
} from "@/services/Seller/Orders/sellerOrderActions";
import { CustomPagination } from "@/components/ui/pagination";
import formatRupiah from "@/lib/utils/formatters";
import { toast } from "@/lib/toast";
import { mutate } from "swr";
import ShipModal from "./components/ShipModal";
import OrderHistoryModal from "./components/OrderHistoryModal";
import Image from "next/image";

const statusConfig = {
  pending: { label: "Menunggu Bayar", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  processing: { label: "Diproses", color: "bg-blue-100 text-blue-700 border-blue-200" },
  shipped: { label: "Dikirim", color: "bg-purple-100 text-purple-700 border-purple-200" },
  delivered: { label: "Terkirim", color: "bg-teal-100 text-teal-700 border-teal-200" },
  completed: { label: "Selesai", color: "bg-green-100 text-green-700 border-green-200" },
  cancelled: { label: "Dibatalkan", color: "bg-red-100 text-red-700 border-red-200" },
};

const tabs = [
  { label: "Semua", value: "", icon: Package },
  { label: "Baru", value: "pending", icon: Clock },
  { label: "Diproses", value: "processing", icon: Package },
  { label: "Dikirim", value: "shipped", icon: Truck },
  { label: "Selesai", value: "completed", icon: CheckCircle },
  { label: "Dibatalkan", value: "cancelled", icon: XCircle },
];

const OrderCard = ({ order, onShip, onHistory }) => {
  const { trigger: accept, isMutating: isAccepting } = useAcceptOrder();
  const cfg = statusConfig[order.status] || statusConfig.pending;

  const handleAccept = async () => {
    try {
      await accept({ id: order.id });
      toast.success("Pesanan diterima dan sedang diproses");
      mutate((key) => Array.isArray(key) && key[0] === "/v1/orders/seller");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal menerima pesanan");
    }
  };

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        {/* Order Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-gray-700">
              #{order.invoice_number || order.id.slice(0, 8).toUpperCase()}
            </span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.color}`}>
              {cfg.label}
            </span>
          </div>

          {/* Buyer */}
          <p className="text-xs text-gray-500 mb-2">
            Pembeli: <span className="font-medium text-gray-700">{order.buyer_name}</span>
          </p>

          {/* Items */}
          <div className="space-y-1">
            {order.items?.slice(0, 2).map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.product_name}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={14} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-700 truncate">
                  {item.product_name} × {item.quantity}
                </p>
              </div>
            ))}
            {order.items?.length > 2 && (
              <p className="text-[10px] text-gray-400 ml-11">
                +{order.items.length - 2} produk lainnya
              </p>
            )}
          </div>
        </div>

        {/* Total & Actions */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <p className="text-sm font-bold text-[#03AC0E]">
            {formatRupiah(order.total_price)}
          </p>
          <div className="flex flex-wrap gap-1.5 justify-end">
            <Button
              size="sm"
              variant="outline"
              className="text-[10px] h-7 px-2.5 border-gray-200"
              onClick={() => onHistory(order)}
            >
              Riwayat
            </Button>
            {order.status === "processing" && (
              <Button
                size="sm"
                className="text-[10px] h-7 px-2.5 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => onShip(order)}
              >
                <Truck size={11} className="mr-1" />
                Kirim
              </Button>
            )}
            {order.status === "pending" && order.payment_status === "paid" && (
              <Button
                size="sm"
                className="text-[10px] h-7 px-2.5 bg-[#03AC0E] hover:bg-[#028a0b] text-white"
                onClick={handleAccept}
                disabled={isAccepting}
              >
                {isAccepting ? "..." : "Terima"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SellerOrdersContainer = () => {
  const [activeTab, setActiveTab] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [shipOrder, setShipOrder] = useState(null);
  const [historyOrder, setHistoryOrder] = useState(null);

  const { data, isLoading } = useSellerOrders({
    page,
    limit: 15,
    status: activeTab,
  });

  const orders = (data?.orders || []).filter((o) =>
    search
      ? o.invoice_number?.toLowerCase().includes(search.toLowerCase()) ||
        o.buyer_name?.toLowerCase().includes(search.toLowerCase())
      : true
  );
  const totalPages = data?.totalPages || 1;

  const handleTabChange = (val) => {
    setActiveTab(val);
    setPage(1);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pesanan</h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola semua pesanan tokomu di sini
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-100">
            <Package className="text-[#03AC0E]" size={18} />
            <div>
              <p className="text-xs text-gray-600">Total Pesanan</p>
              <p className="text-sm font-bold text-gray-900">{data?.total || 0}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Input
            placeholder="Cari invoice atau nama pembeli..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search size={16} className="text-gray-400" />}
            className="h-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="bg-white border border-gray-200 rounded-xl p-1 h-auto w-full flex flex-wrap gap-1 mb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg data-[state=active]:bg-[#03AC0E] data-[state=active]:text-white transition-all"
              >
                <Icon size={13} />
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {isLoading ? (
              <div className="space-y-0 divide-y divide-gray-100">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 animate-pulse">
                    <div className="h-4 bg-gray-100 rounded w-1/4 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="text-gray-400" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Tidak ada pesanan
                </h3>
                <p className="text-sm text-gray-500">
                  {search ? "Tidak ditemukan pesanan yang sesuai" : "Belum ada pesanan masuk"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onShip={setShipOrder}
                    onHistory={setHistoryOrder}
                  />
                ))}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-4">
              <CustomPagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                siblingCount={1}
                className="justify-center"
              />
            </div>
          )}
        </TabsContent>
      </Tabs>

      {shipOrder && (
        <ShipModal
          order={shipOrder}
          onClose={() => setShipOrder(null)}
        />
      )}
      {historyOrder && (
        <OrderHistoryModal
          order={historyOrder}
          onClose={() => setHistoryOrder(null)}
        />
      )}
    </div>
  );
};

export default SellerOrdersContainer;
