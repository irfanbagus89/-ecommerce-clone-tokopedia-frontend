"use client";

import { useState } from "react";
import {
  useAdminSellers,
  useVerifySeller,
} from "@/services/Admin/adminActions";
import { Input } from "@/components/ui/input";
import { Search, Wallet } from "lucide-react";
import { toast } from "@/lib/toast";
import { CustomPagination } from "@/components/ui/pagination";
import SellerBalanceModal from "./SellerBalanceModal";

const AdminSellersPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [balanceSeller, setBalanceSeller] = useState(null);
  const { data, isLoading, mutate } = useAdminSellers({
    page,
    limit: 10,
    search,
  });
  const { trigger: verifySeller, isMutating } = useVerifySeller();

  const sellers = data?.data || data?.sellers || [];
  const totalPages = data?.totalPages || data?.total_pages || 1;

  const handleVerify = async (id, currentStatus) => {
    try {
      await verifySeller({ id, verified: !currentStatus });
      toast.success("Status verifikasi seller diperbarui");
      mutate();
    } catch {
      toast.error("Gagal memperbarui status seller");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Seller</h1>
          <p className="text-sm text-gray-500 mt-1">
            Daftar semua toko dan seller
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="max-w-md">
            <Input
              placeholder="Cari toko..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              leftIcon={<Search className="text-gray-400" size={18} />}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Nama Toko</th>
                <th className="px-6 py-4">Pemilik</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Bergabung</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    Memuat...
                  </td>
                </tr>
              ) : sellers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    Tidak ada seller
                  </td>
                </tr>
              ) : (
                sellers.map((seller) => (
                  <tr key={seller.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {seller.store_name}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {seller.user_name || seller.user_id}
                    </td>
                    <td className="px-6 py-4">
                      {seller.is_verified ? (
                        <span className="px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700">
                          Terverifikasi
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-700">
                          Menunggu
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {seller.created_at
                        ? new Date(seller.created_at).toLocaleDateString(
                            "id-ID",
                          )
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setBalanceSeller(seller)}
                          className="px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold rounded-lg flex items-center gap-1"
                        >
                          <Wallet size={11} />
                          Saldo
                        </button>
                        <button
                          onClick={() =>
                            handleVerify(seller.id, seller.is_verified)
                          }
                          disabled={isMutating}
                          className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                            seller.is_verified
                              ? "bg-red-50 text-red-600 hover:bg-red-100"
                              : "bg-[#03AC0E] text-white hover:bg-[#028a0b]"
                          }`}
                        >
                          {seller.is_verified ? "Cabut" : "Verifikasi"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100">
            <CustomPagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              siblingCount={1}
              className="justify-center"
            />
          </div>
        )}
      </div>

      {balanceSeller && (
        <SellerBalanceModal
          seller={balanceSeller}
          onClose={() => setBalanceSeller(null)}
        />
      )}
    </div>
  );
};

export default AdminSellersPage;
