"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OrderCard from "@/container/Seller/Orders/components/OrderCard";

/* =========================
   DUMMY DATA
========================= */
const ordersDummy = [
  {
    id: "INV-001",
    buyer: "Budi",
    total: 150000,
    status: "pending",
    items: ["Kaos Polos Hitam", "Topi Casual"],
    date: "2025-01-12",
  },
  {
    id: "INV-002",
    buyer: "Siti",
    total: 320000,
    status: "processing",
    items: ["Jaket Hoodie"],
    date: "2025-01-11",
  },
  {
    id: "INV-003",
    buyer: "Andi",
    total: 98000,
    status: "shipped",
    items: ["Kaos Oversize"],
    date: "2025-01-10",
  },
  {
    id: "INV-004",
    buyer: "Rina",
    total: 450000,
    status: "completed",
    items: ["Sepatu Sneakers"],
    date: "2025-01-09",
  },
];

const tabs = [
  { label: "Semua", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Diproses", value: "processing" },
  { label: "Dikirim", value: "shipped" },
  { label: "Selesai", value: "completed" },
  { label: "Dibatalkan", value: "cancelled" },
];

/* =========================
   PAGE
========================= */
const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filteredOrders = ordersDummy.filter((order) => {
    const matchStatus =
      activeTab === "all" ? true : order.status === activeTab;

    const matchSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.buyer.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pesanan</h1>
        <p className="text-sm text-gray-500">
          Kelola semua pesanan tokomu di sini
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            size="sm"
            variant={activeTab === tab.value ? "default" : "outline"}
            className={
              activeTab === tab.value
                ? "bg-[#03AC0E] hover:bg-green-700"
                : ""
            }
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Cari invoice atau nama pembeli..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ORDER LIST */}
      <div className="space-y-4">
        {filteredOrders.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            Tidak ada pesanan
          </div>
        )}

        {filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
