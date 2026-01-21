"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import OrderCard from "@/container/Seller/Orders/components/OrderCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const OrdersPage = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pesanan</h1>
        <p className="text-sm text-gray-500">
          Kelola semua pesanan tokomu di sini
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => {
          const filteredOrders = ordersDummy.filter((order) => {
            const matchStatus =
              tab.value === "all" ? true : order.status === tab.value;

            const matchSearch =
              order.id.toLowerCase().includes(search.toLowerCase()) ||
              order.buyer.toLowerCase().includes(search.toLowerCase());

            return matchStatus && matchSearch;
          });

          return (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                  placeholder="Cari invoice atau nama pembeli..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="space-y-4 mt-4">
                {filteredOrders.length === 0 && (
                  <div className="text-center text-gray-500 py-12">
                    Tidak ada pesanan
                  </div>
                )}
                {filteredOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default OrdersPage;
