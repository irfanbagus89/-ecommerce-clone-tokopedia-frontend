"use client";

import SellerSidebar from "@/components/layouts/SellerSidebar";
import SellerTopbar from "@/components/layouts/SellerTopbar";

const SellerLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <SellerSidebar />

      <div className="flex-1 flex flex-col">
        <SellerTopbar />

        <main className="p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
