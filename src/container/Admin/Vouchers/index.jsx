"use client";

import { useState } from "react";
import {
  useAdminVouchers,
  useCreateVoucher,
  useToggleVoucher,
} from "@/services/Admin/vouchersActions";
import { toast } from "@/lib/toast";
import { Plus, Ticket, Calendar, Percent, DollarSign } from "lucide-react";
import formatRupiah from "@/lib/currencyHelper";
import { CustomPagination } from "@/components/ui/pagination";

const initialForm = {
  code: "",
  type: "percentage",
  value: "",
  min_purchase: "",
  max_discount: "",
  usage_limit: "",
  per_user_limit: "1",
  valid_from: "",
  valid_until: "",
};

const AdminVouchersPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, mutate } = useAdminVouchers({ page, limit: 10 });
  const { trigger: toggleVoucher, isMutating: isToggling } = useToggleVoucher();
  const { trigger: createVoucher, isMutating: isCreating } = useCreateVoucher();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);

  const totalPages = data?.totalPages || data?.total_pages || 1;
  const vouchers = data?.data || data?.vouchers || [];

  const handleToggle = async (id, currentStatus) => {
    try {
      await toggleVoucher({ id, is_active: !currentStatus });
      toast.success("Status voucher diperbarui");
      mutate();
    } catch {
      toast.error("Gagal memperbarui voucher");
    }
  };

  const handleCreate = async () => {
    if (!form.code || !form.value || !form.valid_from || !form.valid_until) {
      toast.error("Lengkapi field wajib (kode, nilai, masa berlaku)");
      return;
    }

    const payload = {
      code: form.code.toUpperCase(),
      type: form.type,
      value: Number(form.value),
      min_purchase: Number(form.min_purchase) || 0,
      max_discount: Number(form.max_discount) || 0,
      usage_limit: Number(form.usage_limit) || 0,
      per_user_limit: Number(form.per_user_limit) || 1,
      seller_id: null,
      valid_from: new Date(form.valid_from).toISOString(),
      valid_until: new Date(form.valid_until).toISOString(),
    };

    try {
      await createVoucher(payload);
      toast.success("Voucher berhasil dibuat");
      setShowForm(false);
      setForm(initialForm);
      mutate();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal membuat voucher");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Voucher</h1>
          <p className="text-sm text-gray-500 mt-1">
            Daftar voucher diskon platform
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#03AC0E] hover:bg-[#028a0b] text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"
        >
          <Plus size={16} /> Tambah Voucher
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Ticket size={18} className="text-[#03AC0E]" />
            Buat Voucher Baru
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Kode Voucher
              </label>
              <input
                value={form.code}
                onChange={(e) =>
                  setForm({ ...form, code: e.target.value.toUpperCase() })
                }
                placeholder="DISKON10"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm uppercase focus:outline-none focus:border-[#03AC0E]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Tipe Diskon
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#03AC0E]"
              >
                <option value="percentage">Persentase (%)</option>
                <option value="fixed">Nominal (Rp)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Nilai Diskon
              </label>
              <input
                type="number"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                placeholder={form.type === "percentage" ? "10" : "50000"}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#03AC0E]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Min. Pembelian
              </label>
              <input
                type="number"
                value={form.min_purchase}
                onChange={(e) =>
                  setForm({ ...form, min_purchase: e.target.value })
                }
                placeholder="100000"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#03AC0E]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Max. Diskon (Rp)
              </label>
              <input
                type="number"
                value={form.max_discount}
                onChange={(e) =>
                  setForm({ ...form, max_discount: e.target.value })
                }
                placeholder="50000"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#03AC0E]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Kuota Total
              </label>
              <input
                type="number"
                value={form.usage_limit}
                onChange={(e) =>
                  setForm({ ...form, usage_limit: e.target.value })
                }
                placeholder="100"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#03AC0E]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Limit per User
              </label>
              <input
                type="number"
                value={form.per_user_limit}
                onChange={(e) =>
                  setForm({ ...form, per_user_limit: e.target.value })
                }
                placeholder="1"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#03AC0E]"
              />
            </div>
            <div className="md:col-span-1">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Berlaku Mulai
              </label>
              <input
                type="datetime-local"
                value={form.valid_from}
                onChange={(e) =>
                  setForm({ ...form, valid_from: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#03AC0E]"
              />
            </div>
            <div className="md:col-span-1">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Berlaku Sampai
              </label>
              <input
                type="datetime-local"
                value={form.valid_until}
                onChange={(e) =>
                  setForm({ ...form, valid_until: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#03AC0E]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setShowForm(false);
                setForm(initialForm);
              }}
              className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              onClick={handleCreate}
              disabled={isCreating}
              className="px-4 py-2 bg-[#03AC0E] hover:bg-[#028a0b] text-white rounded-xl text-sm font-semibold disabled:opacity-60"
            >
              {isCreating ? "Menyimpan..." : "Simpan Voucher"}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Kode</th>
                <th className="px-6 py-4">Tipe</th>
                <th className="px-6 py-4">Nilai</th>
                <th className="px-6 py-4">Min. Beli</th>
                <th className="px-6 py-4">Pemakaian</th>
                <th className="px-6 py-4">Masa Berlaku</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="text-center py-8">
                    Memuat...
                  </td>
                </tr>
              ) : vouchers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-gray-500">
                    Tidak ada voucher
                  </td>
                </tr>
              ) : (
                vouchers.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-gray-900">
                      <span className="px-2 py-1 bg-green-50 text-[#03AC0E] rounded-lg text-xs">
                        {v.code}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {v.type === "percentage" ? (
                        <span className="inline-flex items-center gap-1 text-blue-600">
                          <Percent size={12} /> Persen
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-orange-600">
                          <DollarSign size={12} /> Nominal
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      {v.type === "percentage"
                        ? `${v.value}%`
                        : formatRupiah(v.value)}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {formatRupiah(v.min_purchase || 0)}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {v.used_count || 0} / {v.usage_limit || "∞"}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar size={11} />
                        <span>
                          {v.valid_from
                            ? new Date(v.valid_from).toLocaleDateString("id-ID")
                            : "-"}
                          {" - "}
                          {v.valid_until
                            ? new Date(v.valid_until).toLocaleDateString(
                                "id-ID",
                              )
                            : "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {v.is_active ? (
                        <span className="px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700">
                          Aktif
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                          Nonaktif
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleToggle(v.id, v.is_active)}
                        disabled={isToggling}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                          v.is_active
                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                            : "bg-[#03AC0E] text-white hover:bg-[#028a0b]"
                        }`}
                      >
                        {v.is_active ? "Nonaktifkan" : "Aktifkan"}
                      </button>
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
    </div>
  );
};

export default AdminVouchersPage;
