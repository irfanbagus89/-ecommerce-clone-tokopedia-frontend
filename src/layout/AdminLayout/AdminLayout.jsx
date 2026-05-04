"use client";

import { useState } from "react";
import AdminSidebar from "@/components/layouts/AdminSidebar";
import AdminTopbar from "@/components/layouts/AdminTopbar";

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar collapsed={collapsed} />

      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
        collapsed ? "ml-20" : "ml-64"
      }`}>
        <AdminTopbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
