"use client";

import { useState } from "react";
import { useAdminWithdrawals, useProcessWithdrawal } from "@/services/Admin/adminActions";
import { toast } from "@/lib/toast";

const AdminWithdrawalsPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, mutate } = useAdminWithdrawals({ page, limit: 10 });
  const { trigger: processWithdrawal, isMutating } = useProcessWithdrawal();

  const handleProcess = async (id, status) => {
    try {
      await processWithdrawal({ id, status });
      toast.success(`Penarikan berhasil di${status === "approved" ? "setujui" : "tolak"}`);
      mutate();
    } catch {
      toast.error("Gagal memproses penarikan");
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Penarikan</h1>
        <p className="text-sm text-gray-500 mt-1">Persetujuan penarikan saldo seller</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">ID Penarikan</th>
                <th className="px-6 py-4">Seller ID</th>
                <th className="px-6 py-4">Jumlah</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-8">Memuat...</td>
                </tr>
              ) : data?.data?.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">Tidak ada penarikan</td>
                </tr>
              ) : (
                data?.data?.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-xs">{item.id}</td>
                    <td className="px-6 py-4">{item.seller_id}</td>
                    <td className="px-6 py-4 font-medium">Rp {Number(item.amount).toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium uppercase ${
                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        item.status === 'approved' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {item.status === "pending" && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleProcess(item.id, "approved")}
                            disabled={isMutating}
                            className="px-3 py-1 bg-[#03AC0E] text-white hover:bg-[#028a0b] text-xs font-semibold rounded-lg"
                          >
                            Setujui
                          </button>
                          <button
                            onClick={() => handleProcess(item.id, "rejected")}
                            disabled={isMutating}
                            className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold rounded-lg"
                          >
                            Tolak
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminWithdrawalsPage;
