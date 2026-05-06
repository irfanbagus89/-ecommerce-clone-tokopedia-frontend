"use client";

import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Search,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const SellerTopbar = ({ collapsed = false, setCollapsed = () => {} }) => {
  const router = useRouter();
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed((s) => !s)}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <div className="hidden md:block">
          <h1 className="text-base font-semibold text-gray-900">
            Seller Center
          </h1>
          <p className="text-xs text-gray-500">Kelola bisnis online Anda</p>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 max-w-xl mx-8">
        <div className="relative w-full">
          <Input
            placeholder="Cari produk, pesanan, atau lainnya..."
            className=" h-10 bg-gray-50 border-gray-200 focus:border-[#03AC0E] focus:ring-[#03AC0E]/20"
            leftIcon={<Search className="text-gray-400" size={18} />}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="text-gray-600" size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          <HelpCircle className="text-gray-600" size={18} />
          <span className="text-sm font-medium text-gray-700">Bantuan</span>
        </button>
        <div className="hidden md:block w-px h-8 bg-gray-200 mx-1"></div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-gray-900">
              Toko Sejahtera
            </p>
            <p className="text-xs text-gray-500">Premium Seller</p>
          </div>
          <Avatar className="w-10 h-10 border-2 border-[#03AC0E]">
            <AvatarFallback className="bg-linear-to-br from-[#03AC0E] to-[#028a0b] text-white font-semibold">
              TS
            </AvatarFallback>
          </Avatar>
        </div>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-gray-600"
          onClick={() => router.replace("/")}
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default SellerTopbar;
