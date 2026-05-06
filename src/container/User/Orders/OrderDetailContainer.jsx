"use client";

import { useOrderDetail } from "@/services/User/Orders/getOrderDetail";
import { useConfirmOrder } from "@/services/User/Orders/confirmOrder";
import { useCancelOrder } from "@/services/User/Orders/cancelOrder";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import formatRupiah from "@/lib/utils/formatters";
import { toast } from "@/lib/toast";
import { mutate } from "swr";
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  Copy,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const statusConfig = {
  pending: { label: "Menunggu Pembayaran", color: "bg-yellow-100 text-yellow-700" },
  processing: { label: "Diproses", color: "bg-blue-100 text-blue-700" },
  shipped: { label: "Dikirim", color: "bg-purple-100 text-purple-700" },
  delivered: { label: "Terkirim", color: "bg-teal-100 text-teal-700" },
  completed: { label: "Selesai", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Dibatalkan", color: "bg-red-100 text-red-700" },
};

const StepIndicator = ({ steps, currentStatus }) => {
  const activeStatuses = ["pending", "processing", "shipped", "delivered", "completed"];
  const activeIndex = activeStatuses.indexOf(currentStatus);

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2">
      {steps.map((step, i) => (
        <div key={step.value} className="flex items-center gap-1 flex-shrink-0">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              i <= activeIndex
                ? "bg-[#03AC0E] text-white"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {i < activeIndex ? <CheckCircle size={14} /> : i + 1}
          </div>
          <span
            className={`text-xs font-medium whitespace-nowrap ${
              i <= activeIndex ? "text-[#03AC0E]" : "text-gray-400"
            }`}
          >
            {step.label}
          </span>
          {i < steps.length - 1 && (
            <div
              className={`h-0.5 w-8 transition-colors ${
                i < activeIndex ? "bg-[#03AC0E]" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const steps = [
  { value: "pending", label: "Bayar" },
  { value: "processing", label: "Proses" },
  { value: "shipped", label: "Kirim" },
  { value: "delivered", label: "Terima" },
  { value: "completed", label: "Selesai" },
];

const OrderDetailContainer = ({ orderId }) => {
  const router = useRouter();
  const { data: order, isLoading } = useOrderDetail(orderId);
  const { trigger: confirm, isMutating: isConfirming } = useConfirmOrder(orderId);
  const { trigger: cancel, isMutating: isCancelling } = useCancelOrder(orderId);

  const handleConfirm = async () => {
    try {
      await confirm();
      toast.success("Pesanan dikonfirmasi diterima!");
      mutate(`/v1/orders/my-orders/${orderId}`);
    } catch {
      toast.error("Gagal konfirmasi");
    }
  };

  const handleCancel = async () => {
    try {
      await cancel();
      toast.success("Pesanan dibatalkan");
      mutate(`/v1/orders/my-orders/${orderId}`);
    } catch {
      toast.error("Gagal membatalkan");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <Package size={48} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-700">Pesanan tidak ditemukan</h2>
        <Link href="/orders">
          <Button className="mt-4 bg-[#03AC0E] hover:bg-[#028a0b] text-white">
            Kembali ke Pesanan
          </Button>
        </Link>
      </div>
    );
  }

  const cfg = statusConfig[order.status] || statusConfig.pending;

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm"
      >
        <ArrowLeft size={16} />
        Kembali
      </button>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500">No. Pesanan</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-gray-900">
                {order.invoice_number || `#${order.id.slice(0, 8).toUpperCase()}`}
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(order.invoice_number || order.id);
                  toast.success("Disalin!");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <Copy size={12} />
              </button>
            </div>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${cfg.color}`}>
            {cfg.label}
          </span>
        </div>

        {order.status !== "cancelled" && (
          <StepIndicator steps={steps} currentStatus={order.status} />
        )}
      </div>
      {order.shipping && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-[#03AC0E]" />
            <h3 className="text-sm font-bold text-gray-900">Alamat Pengiriman</h3>
          </div>
          <p className="text-sm font-semibold text-gray-900">
            {order.shipping.recipient_name}
          </p>
          <p className="text-sm text-gray-600">{order.shipping.recipient_phone}</p>
          <p className="text-sm text-gray-600 mt-1">{order.shipping.address}</p>
          {order.shipping.tracking_number && (
            <div className="mt-3 bg-blue-50 rounded-lg px-3 py-2 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">No. Resi</p>
                <p className="text-sm font-bold text-blue-700">
                  {order.shipping.tracking_number}
                </p>
              </div>
              <Truck size={18} className="text-blue-500" />
            </div>
          )}
        </div>
      )}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Produk Dipesan</h3>
        <div className="space-y-3">
          {order.items?.map((item, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.product_name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package size={20} className="text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{item.product_name}</p>
                {item.variant_name && (
                  <p className="text-xs text-gray-500">Varian: {item.variant_name}</p>
                )}
                <p className="text-xs text-gray-500">
                  {item.quantity}x {formatRupiah(item.price)}
                </p>
              </div>
              <p className="text-sm font-bold text-gray-900">
                {formatRupiah(item.quantity * item.price)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Rincian Pembayaran</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-900">{formatRupiah(order.subtotal || order.total_price)}</span>
          </div>
          {order.shipping_cost > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Ongkos Kirim</span>
              <span className="text-gray-900">{formatRupiah(order.shipping_cost)}</span>
            </div>
          )}
          {order.discount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Diskon Voucher</span>
              <span className="text-green-600">-{formatRupiah(order.discount)}</span>
            </div>
          )}
          <div className="border-t border-gray-100 pt-2 flex justify-between">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-[#03AC0E] text-base">
              {formatRupiah(order.total_price)}
            </span>
          </div>
        </div>

        {order.payment && (
          <div className="mt-3 bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">
              Metode Pembayaran: <span className="font-medium text-gray-700">{order.payment.method?.toUpperCase()}</span>
            </p>
            <p className="text-xs text-gray-500">
              Status:{" "}
              <span
                className={`font-medium ${
                  order.payment.status === "paid" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {order.payment.status === "paid" ? "Lunas" : "Belum Lunas"}
              </span>
            </p>
          </div>
        )}
      </div>
      {(order.status === "pending" || order.status === "delivered") && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-3">
          {order.status === "pending" && (
            <Button
              variant="outline"
              className="flex-1 text-red-500 border-red-200 hover:bg-red-50"
              onClick={handleCancel}
              disabled={isCancelling}
            >
              {isCancelling ? "Membatalkan..." : "Batalkan Pesanan"}
            </Button>
          )}
          {order.status === "delivered" && (
            <Button
              className="flex-1 bg-[#03AC0E] hover:bg-[#028a0b] text-white"
              onClick={handleConfirm}
              disabled={isConfirming}
            >
              {isConfirming ? "Mengkonfirmasi..." : "Konfirmasi Barang Diterima"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetailContainer;
