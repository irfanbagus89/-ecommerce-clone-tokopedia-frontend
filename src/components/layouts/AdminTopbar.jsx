"use client";

import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthProvider";

const AdminTopbar = ({ collapsed = false, setCollapsed = () => {} }) => {
  const router = useRouter();
  const { user, logout } = useAuthContext();
  
  const handleLogout = () => {
    logout();
    router.replace("/");
  };

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
          <h1 className="text-base font-semibold text-gray-900">Admin Panel</h1>
          <p className="text-xs text-gray-500">Pusat kendali e-commerce</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-gray-900">{user?.name || "Administrator"}</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          <Avatar className="w-10 h-10 border-2 border-[#03AC0E]">
            <AvatarFallback className="bg-linear-to-br from-[#03AC0E] to-[#028a0b] text-white font-semibold flex items-center justify-center">
              <ShieldCheck size={18} />
            </AvatarFallback>
          </Avatar>
        </div>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-gray-600"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
