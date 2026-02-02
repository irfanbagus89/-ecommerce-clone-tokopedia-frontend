"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  MessageCircle,
  BarChart2,
  Settings,
} from "lucide-react";

const menus = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Kelola Produk", href: "/products", icon: Package },
  { label: "Pesanan", href: "/orders", icon: ShoppingBag },
  { label: "Chat Pembeli", href: "/chats", icon: MessageCircle },
  { label: "Statistik", href: "/statistics", icon: BarChart2 },
  { label: "Pengaturan Toko", href: "/settings", icon: Settings },
];

const SellerSidebar = ({ collapsed = false }) => {
  const pathname = usePathname();

  return (
    <aside
      className={`bg-white border-r min-h-screen p-4 transition-all duration-200 flex flex-col ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="mb-6">
        <div className={`text-xl font-bold text-[#03AC0E] ${collapsed ? "hidden" : ""}`}>
          Seller Center
        </div>
      </div>

      <nav className="space-y-1 flex-1">
        {menus.map((menu, i) => {
          const Icon = menu.icon;
          const active = pathname.includes(menu.href);

          return (
            <Link
              key={i}
              href={`${menu.href}`}
              title={menu.label}
              className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} px-3 py-2 rounded-md text-sm transition ${
                active
                  ? "bg-green-50 text-[#03AC0E] font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              <span className={`${collapsed ? "hidden" : "block"}`}>{menu.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SellerSidebar;
