"use client";

import { useState } from "react";
import HeaderSection from "./components/HeaderSection";
import SummarySection from "./components/SummarySection";
import SalesSection from "./components/SalesSection";
import RecentOrders from "./components/RecentOrders";

export const sales7Days = [
  { date: "Mon", sales: 120000 },
  { date: "Tue", sales: 180000 },
  { date: "Wed", sales: 150000 },
  { date: "Thu", sales: 220000 },
  { date: "Fri", sales: 300000 },
  { date: "Sat", sales: 280000 },
  { date: "Sun", sales: 350000 },
];

export const sales30Days = [
  { date: "Week 1", sales: 1200000 },
  { date: "Week 2", sales: 1800000 },
  { date: "Week 3", sales: 1500000 },
  { date: "Week 4", sales: 2300000 },
];
const SellerDashboardPage = () => {
  const [period, setPeriod] = useState("7days");
  const chartData = period === "7days" ? sales7Days : sales30Days;

  return (
    <div className="p-6">
      <HeaderSection />
      <SummarySection />
      <SalesSection
        period={period}
        setPeriod={setPeriod}
        chartData={chartData}
      />
      <RecentOrders />
    </div>
  );
};

export default SellerDashboardPage;

