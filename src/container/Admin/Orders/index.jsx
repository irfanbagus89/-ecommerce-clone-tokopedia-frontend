"use client";

import { useState } from "react";
import { useAdminOrders, useRefundOrder } from "@/services/Admin/adminActions";
import { toast } from "@/lib/toast";

const AdminOrdersPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, mutate } = useAdminOrders({ page, limit: 10 });
  const { trigger: refundOrder, isMutating } = useRefundOrder();

  const handleRefund = async (id) => {
    try {
      await refundOrder({ id });
      toast.success("Order berhasil direfund");
      mutate();
    } catch {
      toast.error("Gagal melakukan refund");
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Pesanan</h1>
        <p className="text-sm text-gray-500 mt-1">Pantau seluruh pesanan di platform</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">ID Pesanan</th>
                <th className="px-6 py-4">Seller ID</th>
                <th className="px-6 py-4">Total</th>
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
                  <td colSpan="5" className="text-center py-8 text-gray-500">Tidak ada pesanan</td>
                </tr>
              ) : (
                data?.data?.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                    <td className="px-6 py-4">{order.seller_id}</td>
                    <td className="px-6 py-4 font-medium">Rp {Number(order.total_price).toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 uppercase">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {["cancelled", "returned"].includes(order.status) && (
                        <button
                          onClick={() => handleRefund(order.id)}
                          disabled={isMutating}
                          className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold rounded-lg"
                        >
                          Refund
                        </button>
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

export default AdminOrdersPage;
