"use client";

import { useState } from "react";
import SellerSidebar from "@/components/layouts/SellerSidebar";
import SellerTopbar from "@/components/layouts/SellerTopbar";

const SellerLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SellerSidebar collapsed={collapsed} />

      <div className="flex-1 flex flex-col">
        <SellerTopbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};

export default SellerLayout;
