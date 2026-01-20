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

const SellerSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <div className="text-xl font-bold text-[#03AC0E] mb-6">
        Seller Center
      </div>

      <nav className="space-y-1">
        {menus.map((menu, i) => {
          const Icon = menu.icon;
          const active = pathname.includes(menu.href);

          return (
            <Link
              key={i}
              href={`/seller${menu.href}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                active
                  ? "bg-green-50 text-[#03AC0E] font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {menu.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SellerSidebar;
