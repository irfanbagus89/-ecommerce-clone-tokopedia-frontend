"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Store,
  CreditCard,
  Ticket,
  ShieldCheck,
} from "lucide-react";

const menus = [
  { label: "Dashboard", href: "/dashboard-admin", icon: LayoutDashboard },
  { label: "Pengguna", href: "/users", icon: Users },
  { label: "Seller", href: "/sellers", icon: Store },
  { label: "Pesanan", href: "/orders-admin", icon: ShoppingBag },
  { label: "Penarikan", href: "/withdrawals", icon: CreditCard },
  { label: "Voucher", href: "/vouchers", icon: Ticket },
];

const AdminSidebar = ({ collapsed = false }) => {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col shadow-sm z-40 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className={`p-5 border-b border-gray-100 ${collapsed ? "flex justify-center" : ""}`}>
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-[#03AC0E] to-[#028a0b] rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
              <ShieldCheck className="text-white" size={20} />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900 leading-tight">Admin Panel</div>
              <div className="text-xs text-gray-500">Kelola E-Commerce</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 bg-linear-to-br from-[#03AC0E] to-[#028a0b] rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
            <ShieldCheck className="text-white" size={20} />
          </div>
        )}
      </div>

      <nav className={`flex-1 py-4 ${collapsed ? "px-2" : "px-3"}`}>
        <div className="space-y-1">
          {menus.map((menu, i) => {
            const Icon = menu.icon;
            const active = pathname.includes(menu.href);

            return (
              <Link
                key={i}
                href={menu.href}
                title={menu.label}
                className={`group flex items-center ${collapsed ? "justify-center" : "gap-3"} px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  active
                    ? "bg-[#03AC0E] text-white shadow-md shadow-green-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#03AC0E]"
                }`}
              >
                <Icon
                  size={20}
                  className={`${active ? "text-white" : "text-gray-500 group-hover:text-[#03AC0E]"} transition-colors duration-200`}
                />
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
    </aside>
  );
};

export default AdminSidebar;
