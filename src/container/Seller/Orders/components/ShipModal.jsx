"use client";

import { useState } from "react";
import { useShipOrder } from "@/services/Seller/Orders/sellerOrderActions";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { mutate } from "swr";
import { Truck, X } from "lucide-react";

const ShipModal = ({ order, onClose }) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [courier, setCourier] = useState("");
  const { trigger: ship, isMutating } = useShipOrder();

  const handleShip = async () => {
    if (!trackingNumber.trim()) {
      toast.error("Masukkan nomor resi pengiriman");
      return;
    }
    try {
      await ship({
        id: order.id,
        tracking_number: trackingNumber.trim(),
        courier: courier.trim() || undefined,
      });
      toast.success("Pesanan berhasil dikirim!");
      mutate((key) => Array.isArray(key) && key[0] === "/v1/orders/seller");
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal mengirim pesanan");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Truck size={18} className="text-blue-500" />
            <h2 className="text-base font-bold text-gray-900">Kirim Pesanan</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-600">
            Pesanan:{" "}
            <span className="font-bold">
              #{order.invoice_number || order.id.slice(0, 8).toUpperCase()}
            </span>
          </p>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Kurir / Ekspedisi
            </label>
            <input
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
              placeholder="Contoh: JNE, J&T, SiCepat..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Nomor Resi <span className="text-red-500">*</span>
            </label>
            <input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Masukkan nomor resi..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="flex gap-3 p-5 border-t border-gray-100">
          <Button
            variant="outline"
            className="flex-1 text-sm"
            onClick={onClose}
            disabled={isMutating}
          >
            Batal
          </Button>
          <Button
            className="flex-1 text-sm bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleShip}
            disabled={isMutating || !trackingNumber.trim()}
          >
            {isMutating ? "Mengirim..." : "Konfirmasi Kirim"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShipModal;
