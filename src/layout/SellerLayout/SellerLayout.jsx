"use client";

import { useState } from "react";
import SellerSidebar from "@/components/layouts/SellerSidebar";
import SellerTopbar from "@/components/layouts/SellerTopbar";
import FloatingChatButton from "@/components/layouts/FloatingChatButton";

const SellerLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SellerSidebar collapsed={collapsed} />

      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
        collapsed ? "ml-20" : "ml-64"
      }`}>
        <SellerTopbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      <FloatingChatButton />
    </div>
  );
};

export default SellerLayout;
