"use client";

import { useState } from "react";
import {
  useSellerDashboard,
  useSellerBalance,
  useSellerWithdrawals,
  useRequestWithdrawal,
} from "@/services/Seller/Dashboard/dashboardActions";
import { Button } from "@/components/ui/button";
import formatRupiah from "@/lib/currencyHelper";
import { toast } from "@/lib/toast";
import { mutate as swrMutate } from "swr";
import {
  BarChart2,
  Package,
  ShoppingCart,
  TrendingUp,
  Wallet,
  Plus,
  X,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  Star,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const WithdrawalModal = ({ balance, onClose }) => {
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const { trigger: request, isMutating } = useRequestWithdrawal();

  const handleSubmit = async () => {
    const numAmount = parseInt(amount);
    if (!numAmount || numAmount <= 0) {
      toast.error("Masukkan jumlah penarikan yang valid");
      return;
    }
    if (numAmount > parseFloat(balance?.available_balance || 0)) {
      toast.error("Saldo tidak mencukupi");
      return;
    }
    if (!bankName.trim() || !accountNumber.trim() || !accountHolder.trim()) {
      toast.error("Lengkapi informasi rekening");
      return;
    }
    try {
      await request({
        amount: numAmount,
        bank_name: bankName,
        account_number: accountNumber,
        account_holder: accountHolder,
      });
      toast.success("Request penarikan saldo berhasil dikirim!");
      swrMutate("/v1/seller/dashboard/withdrawals");
      swrMutate("/v1/seller/dashboard/balance");
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal request withdrawal");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Wallet size={18} className="text-[#03AC0E]" />
            <h2 className="text-base font-bold text-gray-900">Tarik Saldo</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-green-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">Saldo Tersedia</p>
            <p className="text-lg font-bold text-[#03AC0E]">
              {formatRupiah(balance?.available_balance || 0)}
            </p>
          </div>
          {[
            {
              label: "Jumlah Penarikan (Rp)",
              value: amount,
              onChange: setAmount,
              type: "number",
              placeholder: "Minimal Rp 10.000",
            },
            {
              label: "Nama Bank",
              value: bankName,
              onChange: setBankName,
              placeholder: "BCA, BNI, Mandiri...",
            },
            {
              label: "No. Rekening",
              value: accountNumber,
              onChange: setAccountNumber,
              placeholder: "Nomor rekening",
            },
            {
              label: "Nama Pemilik Rekening",
              value: accountHolder,
              onChange: setAccountHolder,
              placeholder: "Sesuai buku tabungan",
            },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                {f.label}
              </label>
              <input
                type={f.type || "text"}
                value={f.value}
                onChange={(e) => f.onChange(e.target.value)}
                placeholder={f.placeholder}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#03AC0E] focus:ring-2 focus:ring-[#03AC0E]/20"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-3 p-5 border-t border-gray-100">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isMutating}
          >
            Batal
          </Button>
          <Button
            className="flex-1 bg-[#03AC0E] hover:bg-[#028a0b] text-white"
            onClick={handleSubmit}
            disabled={isMutating}
          >
            {isMutating ? "Memproses..." : "Request Tarik"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color, sub }) => (
  <div className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100`}>
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}
    >
      <Icon size={20} />
    </div>
    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
    <p className="text-xl font-bold text-gray-900">{value}</p>
    {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
  </div>
);

const withdrawalStatus = {
  pending: {
    label: "Menunggu",
    color: "text-yellow-600 bg-yellow-50",
    icon: Clock,
  },
  approved: {
    label: "Disetujui",
    color: "text-green-600 bg-green-50",
    icon: CheckCircle,
  },
  rejected: {
    label: "Ditolak",
    color: "text-red-600 bg-red-50",
    icon: XCircle,
  },
};

const SellerDashboardContainer = () => {
  const { data: dashboard, isLoading } = useSellerDashboard();
  const { data: balance } = useSellerBalance();
  const { data: withdrawals } = useSellerWithdrawals();
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [period, setPeriod] = useState("7days");
  console.log(withdrawals, "tes withdrawls");
  const stats = dashboard?.stats || {};
  const recentOrders = dashboard?.recent_orders || [];
  const salesChart = dashboard?.sales_chart || [];

  const chartData =
    period === "7days" ? salesChart.slice(-7) : salesChart.slice(-30);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Toko</h1>
          <p className="text-sm text-gray-500">Ringkasan performa tokomu</p>
        </div>
        <Button
          className="bg-[#03AC0E] hover:bg-[#028a0b] text-white"
          onClick={() => setShowWithdraw(true)}
        >
          <Wallet size={16} className="mr-2" />
          Tarik Saldo
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Wallet}
          label="Saldo Tersedia"
          value={formatRupiah(balance?.available_balance || 0)}
          color="bg-green-100 text-[#03AC0E]"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Pendapatan"
          value={formatRupiah(stats.total_revenue || 0)}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={ShoppingCart}
          label="Total Pesanan"
          value={stats.total_orders || 0}
          color="bg-purple-100 text-purple-600"
          sub={`${stats.pending_orders || 0} menunggu`}
        />
        <StatCard
          icon={Star}
          label="Rating Toko"
          value={
            stats.avg_rating
              ? `${parseFloat(stats.avg_rating).toFixed(1)} ★`
              : "—"
          }
          color="bg-yellow-100 text-yellow-600"
          sub={`${stats.total_reviews || 0} ulasan`}
        />
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-gray-900">
            Grafik Penjualan
          </h2>
          <div className="flex gap-2">
            {["7days", "30days"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  period === p
                    ? "bg-[#03AC0E] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {p === "7days" ? "7 Hari" : "30 Hari"}
              </button>
            ))}
          </div>
        </div>
        {chartData.length === 0 ? (
          <div className="h-48 flex items-center justify-center">
            <p className="text-sm text-gray-400">Data grafik belum tersedia</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#03AC0E" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#03AC0E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                formatter={(v) => formatRupiah(v)}
                labelStyle={{ fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#03AC0E"
                strokeWidth={2}
                fill="url(#salesGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Recent Orders + Withdrawals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">
            Pesanan Terbaru
          </h2>
          {recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <Package size={28} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Belum ada pesanan</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      #
                      {order.invoice_number ||
                        order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">{order.buyer_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#03AC0E]">
                      {formatRupiah(order.total_price)}
                    </p>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Withdrawals */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">
              Riwayat Penarikan
            </h2>
            <button
              onClick={() => setShowWithdraw(true)}
              className="flex items-center gap-1 text-xs text-[#03AC0E] hover:underline font-medium"
            >
              <Plus size={13} />
              Tarik
            </button>
          </div>
          {!withdrawals || withdrawals.data.length === 0 ? (
            <div className="text-center py-8">
              <ArrowDownLeft size={28} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">
                Belum ada riwayat penarikan
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {withdrawals.slice(0, 5).map((wd) => {
                const cfg =
                  withdrawalStatus[wd.status] || withdrawalStatus.pending;
                const Icon = cfg.icon;
                return (
                  <div
                    key={wd.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center ${cfg.color}`}
                      >
                        <Icon size={13} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {formatRupiah(wd.amount)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {wd.bank_name} · {wd.account_number}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.color}`}
                    >
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showWithdraw && (
        <WithdrawalModal
          balance={balance}
          onClose={() => setShowWithdraw(false)}
        />
      )}
    </div>
  );
};

export default SellerDashboardContainer;
