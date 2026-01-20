"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

/* =========================
   DUMMY DATA
========================= */
const sales7Days = [
  { date: "Mon", sales: 120000 },
  { date: "Tue", sales: 180000 },
  { date: "Wed", sales: 150000 },
  { date: "Thu", sales: 220000 },
  { date: "Fri", sales: 300000 },
  { date: "Sat", sales: 280000 },
  { date: "Sun", sales: 350000 },
];

const sales30Days = [
  { date: "Week 1", sales: 1200000 },
  { date: "Week 2", sales: 1800000 },
  { date: "Week 3", sales: 1500000 },
  { date: "Week 4", sales: 2300000 },
];

const topProducts = [
  { name: "Kaos Polos", sold: 120 },
  { name: "Hoodie", sold: 98 },
  { name: "Topi", sold: 76 },
  { name: "Sneakers", sold: 65 },
];

const dummyData = [
  { title: "Total Penjualan", value: "Rp 12.450.000" },
  { title: "Total Pesanan", value: "324" },
  { title: "Pengunjung", value: "4.520" },
  { title: "Conversion Rate", value: "3.4%" },
];

/* =========================
   StatisticsPAGE
========================= */
const StatisticsPage = () => {
  const [period, setPeriod] = useState("7days");

  const chartData = period === "7days" ? sales7Days : sales30Days;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Statistik</h1>
        <p className="text-sm text-gray-500">Analisa performa tokomu</p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {dummyData.map((item, index) => (
          <Card key={index}>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-xl font-semibold mt-1">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FILTER */}
      <div className="flex gap-2 mb-4">
        <Button
          size="sm"
          variant={period === "7days" ? "default" : "outline"}
          className={
            period === "7days" ? "bg-[#03AC0E] hover:bg-green-700" : ""
          }
          onClick={() => setPeriod("7days")}
        >
          7 Hari
        </Button>

        <Button
          size="sm"
          variant={period === "30days" ? "default" : "outline"}
          className={
            period === "30days" ? "bg-[#03AC0E] hover:bg-green-700" : ""
          }
          onClick={() => setPeriod("30days")}
        >
          30 Hari
        </Button>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* SALES LINE */}
        <Card>
          <CardHeader>
            <CardTitle>Grafik Penjualan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#03AC0E"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* TOP PRODUCTS */}
        <Card>
          <CardHeader>
            <CardTitle>Produk Terlaris</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sold" fill="#03AC0E" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Detail Produk Terlaris</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Produk</th>
                <th className="text-left">Terjual</th>
                <th className="text-left">Omzet</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="py-3">{p.name}</td>
                  <td>{p.sold}</td>
                  <td>Rp {(p.sold * 75000).toLocaleString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsPage;
