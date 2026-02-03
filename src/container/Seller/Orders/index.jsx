"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import OrderCard from "@/container/Seller/Orders/components/OrderCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* =========================
   DUMMY DATA
   ========================= */
const ordersDummy = [
  {
    id: "INV-001",
    buyer: "Budi Santoso",
    total: 150000,
    status: "pending",
    items: ["Kaos Polos Hitam", "Topi Casual"],
    date: "2025-01-12",
    address: "Jl. Sudirman No. 123, Jakarta",
  },
  {
    id: "INV-002",
    buyer: "Siti Rahayu",
    total: 320000,
    status: "processing",
    items: ["Jaket Hoodie"],
    date: "2025-01-11",
    address: "Jl. Gatot Subroto No. 45, Bandung",
  },
  {
    id: "INV-003",
    buyer: "Andi Wijaya",
    total: 98000,
    status: "shipped",
    items: ["Kaos Oversize"],
    date: "2025-01-10",
    address: "Jl. Ahmad Yani No. 78, Surabaya",
  },
  {
    id: "INV-004",
    buyer: "Rina Kusuma",
    total: 450000,
    status: "completed",
    items: ["Sepatu Sneakers"],
    date: "2025-01-09",
    address: "Jl. Diponegoro No. 56, Yogyakarta",
  },
  {
    id: "INV-005",
    buyer: "Dewi Lestari",
    total: 275000,
    status: "cancelled",
    items: ["Tas Ransel", "Dompet"],
    date: "2025-01-08",
    address: "Jl. Pahlawan Revolusi No. 12, Bekasi",
  },
];

const tabs = [
  { label: "Semua", value: "all", icon: Package },
  { label: "Menunggu", value: "pending", icon: Clock },
  { label: "Diproses", value: "processing", icon: Package },
  { label: "Dikirim", value: "shipped", icon: Truck },
  { label: "Selesai", value: "completed", icon: CheckCircle },
  { label: "Dibatalkan", value: "cancelled", icon: XCircle },
];

const OrdersPage = () => {
  const [search, setSearch] = useState("");

  // Count orders by status
  const getOrderCount = (status) => {
    if (status === "all") return ordersDummy.length;
    return ordersDummy.filter((order) => order.status === status).length;
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pesanan</h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola semua pesanan tokomu di sini
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-100">
              <Package className="text-[#03AC0E]" size={18} />
              <div>
                <p className="text-xs text-gray-600">Total Pesanan</p>
                <p className="text-sm font-bold text-gray-900">
                  {ordersDummy.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Input
              placeholder="Cari invoice, nama pembeli, atau alamat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 bg-gray-50 border-gray-200 focus:border-[#03AC0E] focus:ring-[#03AC0E]/20"
              leftIcon={<Search size={18} className="text-gray-400" />}
            />
          </div>
        </div>
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white border border-gray-200 rounded-xl p-1 h-auto w-full justify-start overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const count = getOrderCount(tab.value);
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg data-[state=active]:bg-[#03AC0E] data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-green-200 transition-all"
              >
                <Icon size={16} />
                <span className="text-sm font-medium">{tab.label}</span>
                <Badge
                  variant="secondary"
                  className={`text-xs px-2 py-0.5 ${
                    tab.value === "all"
                      ? "bg-gray-100 text-gray-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {count}
                </Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map((tab) => {
          const filteredOrders = ordersDummy.filter((order) => {
            const matchStatus =
              tab.value === "all" ? true : order.status === tab.value;

            const matchSearch =
              order.id.toLowerCase().includes(search.toLowerCase()) ||
              order.buyer.toLowerCase().includes(search.toLowerCase()) ||
              order.address?.toLowerCase().includes(search.toLowerCase());

            return matchStatus && matchSearch;
          });

          return (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Tidak ada pesanan
                    </h3>
                    <p className="text-sm text-gray-500">
                      {search
                        ? "Tidak ditemukan pesanan yang sesuai dengan pencarian"
                        : `Belum ada pesanan dengan status ${tab.label.toLowerCase()}`}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default OrdersPage;
