"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart2,
  Settings,
  Store,
} from "lucide-react";

const menus = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Kelola Produk", href: "/products", icon: Package },
  { label: "Pesanan", href: "/orders", icon: ShoppingBag },
  { label: "Statistik", href: "/statistics", icon: BarChart2 },
  { label: "Pengaturan Toko", href: "/settings", icon: Settings },
];

const SellerSidebar = ({ collapsed = false }) => {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col shadow-sm z-40 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo Section */}
      <div className={`p-5 border-b border-gray-100 ${collapsed ? "flex justify-center" : ""}`}>
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-[#03AC0E] to-[#028a0b] rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
              <Store className="text-white" size={20} />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900 leading-tight">Seller Center</div>
              <div className="text-xs text-gray-500">Kelola Toko Anda</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 bg-linear-to-br from-[#03AC0E] to-[#028a0b] rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
            <Store className="text-white" size={20} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 py-4 ${collapsed ? "px-2" : "px-3"}`}>
        <div className="space-y-1">
          {menus.map((menu, i) => {
            const Icon = menu.icon;
            const active = pathname.includes(menu.href);

            return (
              <Link
                key={i}
                href={`${menu.href}`}
                title={menu.label}
                className={`group flex items-center ${collapsed ? "justify-center" : "gap-3"} px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  active
                    ? "bg-[#03AC0E] text-white shadow-md shadow-green-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#03AC0E]"
                }`}
              >
                <Icon size={20} className={`${active ? "text-white" : "text-gray-500 group-hover:text-[#03AC0E]"} transition-colors duration-200`} />
                {!collapsed && (
                  <span className="transition-opacity duration-200">{menu.label}</span>
                )}
                {active && !collapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className={`p-4 border-t border-gray-100 ${collapsed ? "flex justify-center" : ""}`}>
        {!collapsed && (
          <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-[#03AC0E] rounded-lg flex items-center justify-center">
                <Store className="text-white" size={16} />
              </div>
              <span className="text-sm font-semibold text-gray-800">Toko Premium</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">Tingkatkan penjualan dengan fitur premium</p>
            <button className="w-full bg-[#03AC0E] hover:bg-[#028a0b] text-white text-xs font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md shadow-green-200">
              Upgrade Sekarang
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SellerSidebar;
