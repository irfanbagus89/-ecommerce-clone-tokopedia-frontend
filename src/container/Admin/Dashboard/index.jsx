"use client";

import { useAdminDashboard } from "@/services/Admin/adminActions";
import { Users, ShoppingBag, DollarSign, Store } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorClass}`}>
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
  </div>
);

const AdminDashboardPage = () => {
  const { data, isLoading } = useAdminDashboard();

  if (isLoading) return <div className="p-8">Memuat dashboard...</div>;

  const stats = data || {
    total_users: 0,
    total_sellers: 0,
    total_orders: 0,
    total_revenue: 0,
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-sm text-gray-500 mt-1">Ringkasan performa platform e-commerce</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Pengguna"
          value={stats.total_users}
          icon={Users}
          colorClass="bg-blue-500"
        />
        <StatCard
          title="Total Seller"
          value={stats.total_sellers}
          icon={Store}
          colorClass="bg-purple-500"
        />
        <StatCard
          title="Total Pesanan"
          value={stats.total_orders}
          icon={ShoppingBag}
          colorClass="bg-orange-500"
        />
        <StatCard
          title="Total Pendapatan"
          value={`Rp ${(stats.total_revenue || 0).toLocaleString("id-ID")}`}
          icon={DollarSign}
          colorClass="bg-[#03AC0E]"
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
