"use client";

import { Bell } from "lucide-react";
import Image from "next/image";

const SellerTopbar = () => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div>
        <h1 className="font-semibold">Dashboard Toko</h1>
        <p className="text-xs text-gray-500">
          Kelola tokomu dengan mudah
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Bell className="text-gray-500" size={20} />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <span className="text-sm font-medium">Nama Toko</span>
        </div>
      </div>
    </header>
  );
};

export default SellerTopbar;
