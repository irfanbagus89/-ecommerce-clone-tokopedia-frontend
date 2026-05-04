"use client";

import { useAdminSellerBalance } from "@/services/Admin/adminActions";
import formatRupiah from "@/lib/currencyHelper";
import { Wallet, X, TrendingDown, TrendingUp } from "lucide-react";

const SellerBalanceModal = ({ seller, onClose }) => {
  const { data, isLoading } = useAdminSellerBalance(seller?.id);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#03AC0E] to-[#028a0b] p-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Wallet size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold">Saldo Seller</h2>
                <p className="text-xs text-white/80">{seller?.store_name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-3">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <p className="text-xs text-gray-600">Saldo Tersedia</p>
                <p className="text-2xl font-bold text-[#03AC0E] mt-1">
                  {formatRupiah(data?.available_balance || 0)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-blue-600" />
                    <p className="text-[10px] text-gray-600">Total Pendapatan</p>
                  </div>
                  <p className="text-sm font-bold text-blue-700 mt-1">
                    {formatRupiah(data?.total_income || 0)}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
                  <div className="flex items-center gap-2">
                    <TrendingDown size={14} className="text-orange-600" />
                    <p className="text-[10px] text-gray-600">Total Penarikan</p>
                  </div>
                  <p className="text-sm font-bold text-orange-700 mt-1">
                    {formatRupiah(data?.total_withdrawn || 0)}
                  </p>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-100">
                <p className="text-xs text-gray-600">Pending</p>
                <p className="text-sm font-bold text-yellow-700">
                  {formatRupiah(data?.pending_balance || 0)}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerBalanceModal;
