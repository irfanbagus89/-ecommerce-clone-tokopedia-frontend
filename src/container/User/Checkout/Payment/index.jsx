"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AddressCard from "./Components/AddressCard";
import PaymentSummary from "./Components/PaymentSummary";
import ProductCard from "./Components/ProductCard";
import ShippingOptions from "./Components/ShippingOptions";
import VoucherCard from "./Components/VoucherCard";
import { ArrowLeft, Loader2, Copy, Check, ExternalLink, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { CustomBreadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useAddresses,
  useDefaultAddress,
} from "@/services/User/Addresses/addressActions";
import { useCheckout } from "@/services/User/Checkout/checkoutActions";
import { useCheckoutCart } from "@/services/User/Cart/getCheckoutCart";
import { useValidateVoucher } from "@/services/User/Vouchers/validateVoucher";
import { toast } from "@/lib/toast";
import { usePaymentStatus } from "@/services/User/Orders/usePaymentStatus";

// ── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (str) => {
  if (!str) return "-";
  return new Date(str).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const bankLabel = (code) => {
  const map = {
    bca_va: "BCA",
    bni_va: "BNI",
    bri_va: "BRI",
    permata_va: "Permata",
    cimb_va: "CIMB Niaga",
    echannel: "Mandiri",
  };
  return map[code] ?? code?.toUpperCase();
};

// ── CopyButton ────────────────────────────────────────────────────────────────

const CopyButton = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Gagal menyalin teks");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 rounded hover:bg-gray-100 transition-colors"
      title="Salin"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Copy className="w-4 h-4 text-gray-500" />
      )}
    </button>
  );
};

// ── InfoRow ───────────────────────────────────────────────────────────────────

const InfoRow = ({ label, value, copiable, mono }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <div className="flex items-center gap-1">
      <span className={`text-sm font-medium ${mono ? "font-mono tracking-wider" : ""}`}>
        {value}
      </span>
      {copiable && value && <CopyButton value={String(value)} />}
    </div>
  </div>
);

// ── PaymentInstructions ───────────────────────────────────────────────────────

const StatusBadge = ({ paymentStatus }) => {
  if (!paymentStatus || paymentStatus === "unpaid" || paymentStatus === "pending") {
    return (
      <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
        <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
        <span>Menunggu konfirmasi pembayaran...</span>
      </div>
    );
  }
  if (paymentStatus === "paid") {
    return (
      <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2">
        <CheckCircle2 className="w-4 h-4 shrink-0" />
        <span className="font-medium">Pembayaran dikonfirmasi! Mengalihkan...</span>
      </div>
    );
  }
  if (paymentStatus === "expired") {
    return (
      <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2">
        <Clock className="w-4 h-4 shrink-0" />
        <span>Waktu pembayaran telah habis</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2">
      <Clock className="w-4 h-4 shrink-0" />
      <span>Pembayaran {paymentStatus}</span>
    </div>
  );
};

const PaymentInstructions = ({ result, onDone }) => {
  const { midtrans_order_id, payment_method, payment_type, instructions, order_ids } = result;
  const expired = instructions?.expired_at || result.expired_at;

  // ── Polling status pembayaran ──────────────────────────────────────────────
  const primaryOrderId = order_ids?.[0];
  const { data: orderData } = usePaymentStatus(primaryOrderId);
  const paymentStatus = orderData?.payment_status;

  // ── Countdown timer ────────────────────────────────────────────────────────
  const [secondsLeft, setSecondsLeft] = useState(null);

  useEffect(() => {
    if (!expired) return;
    const expiry = new Date(expired).getTime();
    const tick = () => setSecondsLeft(Math.max(0, Math.floor((expiry - Date.now()) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expired]);

  const formatCountdown = (s) => {
    if (s === null) return null;
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}j ${m}m ${String(sec).padStart(2, "0")}d`;
    return `${m}m ${String(sec).padStart(2, "0")}d`;
  };

  // ── Auto-redirect saat paid ────────────────────────────────────────────────
  useEffect(() => {
    if (paymentStatus !== "paid") return;
    toast.success("Pembayaran berhasil dikonfirmasi!");
    const id = setTimeout(onDone, 3000);
    return () => clearTimeout(id);
  }, [paymentStatus, onDone]);

  // ── Render instruksi per tipe pembayaran ───────────────────────────────────
  const renderDetail = () => {
    switch (payment_type) {
      case "bank_transfer":
        return (
          <div className="space-y-1">
            <InfoRow label="Bank" value={bankLabel(payment_method?.code)} />
            <InfoRow label="Nomor Virtual Account" value={instructions?.va_number} copiable mono />
          </div>
        );

      case "echannel":
        return (
          <div className="space-y-1">
            <InfoRow label="Bank" value="Mandiri" />
            <InfoRow label="Biller Code" value={instructions?.biller_code} copiable mono />
            <InfoRow label="Bill Key" value={instructions?.bill_key} copiable mono />
          </div>
        );

      case "gopay":
      case "shopeepay": {
        const label = payment_type === "gopay" ? "GoPay" : "ShopeePay";
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Selesaikan pembayaran melalui aplikasi {label}.
            </p>
            {instructions?.deeplink_url && (
              <a
                href={instructions.deeplink_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Buka Aplikasi {label}
              </a>
            )}
            {instructions?.qr_string && (
              <div className="text-center space-y-2">
                <p className="text-xs text-muted-foreground">Atau scan QR Code</p>
                <img
                  src={instructions.qr_string}
                  alt="QR Code"
                  className="mx-auto w-48 h-48 object-contain border rounded-lg"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
            )}
          </div>
        );
      }

      case "qris": {
        const qrImageUrl = instructions?.actions?.find(
          (a) => a.name === "generate-qr-code" || a.name === "generate-qr-code-v2"
        )?.url;
        return (
          <div className="space-y-3 text-center">
            <p className="text-sm text-muted-foreground">
              Scan QR Code menggunakan aplikasi e-wallet atau mobile banking Anda.
            </p>
            {qrImageUrl ? (
              <img src={qrImageUrl} alt="QRIS" className="mx-auto w-52 h-52 object-contain border rounded-lg" />
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 text-xs font-mono break-all text-left">
                {instructions?.qr_string}
              </div>
            )}
          </div>
        );
      }

      case "cstore": {
        const codeAction = instructions?.actions?.find((a) => a.name === "generate-qr-code");
        const paymentCode = codeAction?.url || instructions?.payment_code;
        const storeName = payment_method?.code === "alfamart" ? "Alfamart" : "Indomaret";
        return (
          <div className="space-y-1">
            <InfoRow label="Minimarket" value={storeName} />
            {paymentCode && <InfoRow label="Kode Bayar" value={paymentCode} copiable mono />}
          </div>
        );
      }

      default:
        return (
          <p className="text-sm text-muted-foreground">
            Ikuti instruksi dari{" "}
            <span className="font-medium">{payment_method?.name || payment_type}</span> untuk
            menyelesaikan pembayaran.
          </p>
        );
    }
  };

  const isPaid = paymentStatus === "paid";
  const isFailed = ["expired", "cancelled", "failed"].includes(paymentStatus);

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          isPaid ? "bg-green-100" : isFailed ? "bg-red-50" : "bg-green-50"
        }`}>
          {isPaid
            ? <CheckCircle2 className="w-8 h-8 text-green-600" />
            : isFailed
            ? <Clock className="w-8 h-8 text-red-500" />
            : <CheckCircle2 className="w-8 h-8 text-green-600" />
          }
        </div>
        <h1 className="text-xl font-bold">Pesanan Berhasil Dibuat!</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Selesaikan pembayaran sebelum batas waktu
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span>Instruksi Pembayaran</span>
            <span className="text-xs font-normal text-muted-foreground bg-gray-100 px-2 py-1 rounded">
              {payment_method?.name}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Status realtime */}
          <StatusBadge paymentStatus={paymentStatus} />

          {/* Order ID */}
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <InfoRow label="ID Pesanan" value={midtrans_order_id} copiable mono />
          </div>

          {/* Payment detail per type — sembunyikan jika sudah selesai */}
          {!isPaid && !isFailed && (
            <div className="bg-gray-50 rounded-lg px-3 py-1">
              {renderDetail()}
            </div>
          )}

          {/* Countdown + Expiry */}
          {expired && !isPaid && !isFailed && (
            <div className="flex items-center justify-between text-sm bg-amber-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 text-amber-700">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Bayar sebelum <span className="font-semibold">{formatDate(expired)}</span></span>
              </div>
              {secondsLeft !== null && secondsLeft > 0 && (
                <span className="font-mono text-amber-800 font-semibold text-xs tabular-nums">
                  {formatCountdown(secondsLeft)}
                </span>
              )}
            </div>
          )}

          {/* CTA */}
          <Button
            className={`w-full ${isPaid ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-800"}`}
            onClick={onDone}
          >
            {isPaid ? "Lihat Pesanan Saya" : "Ke Halaman Pesanan"}
          </Button>

        </CardContent>
      </Card>
    </div>
  );
};

// ── PaymentPage ───────────────────────────────────────────────────────────────

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const cartItemIds = searchParams.get("ids")
    ? searchParams.get("ids").split(",").filter(Boolean)
    : [];

  const { data: defaultAddress, isLoading: loadingAddress } = useDefaultAddress();
  const { data: addresses, isLoading: loadingAddresses } = useAddresses();

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState({
    courier: "jne_reg",
    name: "JNE Regular",
    price: 9000,
    estimated: "2-3 Hari",
    type: "Reguler",
  });
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [notes, setNotes] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  const { trigger: triggerCheckout } = useCheckout();
  const { data: cartData, isLoading: loadingCart } = useCheckoutCart();
  const { trigger: triggerValidateVoucher } = useValidateVoucher();

  const checkoutItems =
    cartData?.sellers?.flatMap((seller) => seller.items) || [];

  const addressList = addresses || [];
  const selectedAddress =
    addressList.find((a) => a.id === selectedAddressId) ||
    defaultAddress ||
    null;

  const products = checkoutItems.map((item) => ({
    id: item.cart_item_id,
    name: item.product_name,
    variant: item.variant_name,
    image: item.image_url || "/placeholder.png",
    originalPrice:
      item.price != null && item.price !== 0 ? item.price : item.original_price,
    discountedPrice:
      item.price != null && item.price !== 0 ? item.price : item.original_price,
    discountPercent: item.discount || 0,
    quantity: item.quantity,
    stock: item.stock,
  }));

  const calculatePrice = useCallback(
    () => products.reduce((acc, p) => acc + p.originalPrice * p.quantity, 0),
    [products]
  );

  const calculateSubtotal = useCallback(
    () => products.reduce((acc, p) => acc + p.discountedPrice * p.quantity, 0),
    [products]
  );

  const calculateDiscount = useCallback(
    () => calculatePrice() - calculateSubtotal(),
    [calculatePrice, calculateSubtotal]
  );

  const calculateTotal = useCallback(() => {
    const subtotal = calculateSubtotal();
    const shipping = selectedShipping?.price || 0;
    const voucher = selectedVoucher?.discount || 0;
    return subtotal + shipping + voucher + 2000 + 3200;
  }, [calculateSubtotal, selectedShipping, selectedVoucher]);

  const handleSelectVoucher = (voucher) => setSelectedVoucher(voucher);

  const handleApplyVoucher = async (code) => {
    if (!code) return;
    try {
      const res = await triggerValidateVoucher({ code, total: calculateSubtotal() });
      if (res?.Data) {
        setSelectedVoucher({
          code: res.Data.code,
          title: `Diskon ${res.Data.discount_amount}`,
          discount: -res.Data.discount_amount,
          maxDiscount: res.Data.max_discount || 0,
          type: res.Data.discount_type,
        });
        toast.success("Voucher berhasil digunakan!");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal memvalidasi voucher");
      setSelectedVoucher(null);
    }
  };

  const handleRemoveVoucher = () => setSelectedVoucher(null);

  /**
   * Alur pembayaran (Midtrans Core API):
   * 1. POST /v1/orders/checkout → backend charge ke Midtrans Core API
   * 2. Backend mengembalikan instructions (VA number / QR / deeplink)
   * 3. Tampilkan instruksi pembayaran kepada user
   */
  const handlePayment = async () => {
    if (!agreeTerms) {
      toast.error("Mohon setujui syarat & ketentuan terlebih dahulu.");
      return;
    }
    if (cartItemIds.length === 0) {
      toast.error("Tidak ada item yang dipilih. Silakan kembali ke keranjang.");
      return;
    }
    if (!selectedAddress) {
      toast.error("Silakan pilih alamat pengiriman terlebih dahulu.");
      return;
    }

    setIsProcessing(true);
    try {
      const payload = {
        cart_item_ids: cartItemIds,
        address: selectedAddress.address,
        city: selectedAddress.city_name || selectedAddress.city || "",
        postal_code: selectedAddress.postal_code || "",
      };
      if (selectedPaymentMethod) {
        payload.payment_method_code = selectedPaymentMethod;
      }
      if (selectedVoucher?.code) {
        payload.voucher_code = selectedVoucher.code;
      }

      // res = { Metadata: {...}, Data: { midtrans_order_id, payment_method, payment_type, instructions, expired_at } }
      const res = await triggerCheckout(payload);
      const data = res?.Data;

      if (!data?.midtrans_order_id) {
        throw new Error("Response tidak valid dari server.");
      }

      setPaymentResult(data);
      toast.success("Pesanan berhasil dibuat!");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Terjadi kesalahan saat memproses pembayaran.";
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Tampilkan instruksi setelah checkout berhasil ──────────────────────────

  if (paymentResult) {
    return (
      <PaymentInstructions
        result={paymentResult}
        onDone={() => router.push("/orders")}
      />
    );
  }

  // ── Halaman checkout kosong ────────────────────────────────────────────────

  if (!cartItemIds.length) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground mb-4">
          Tidak ada item yang dipilih untuk pembayaran.
        </p>
        <Link href="/checkout/cart" className="text-green-600 hover:underline font-medium">
          ← Kembali ke Keranjang
        </Link>
      </div>
    );
  }

  // ── Form checkout utama ───────────────────────────────────────────────────

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <CustomBreadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Keranjang", href: "/checkout/cart" },
            { label: "Pembayaran" },
          ]}
        />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Link href="/checkout/cart">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <h1 className="text-xl font-bold">Pembayaran</h1>
        {isProcessing && (
          <div className="flex items-center gap-2 text-green-600 text-sm ml-auto">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Memproses pesanan...</span>
          </div>
        )}
      </div>

      <div className="mb-4 text-sm text-muted-foreground">
        {checkoutItems.length} item dipilih dari keranjang
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <AddressCard
            selectedAddress={
              selectedAddress || {
                label:
                  loadingAddress || loadingAddresses
                    ? "Memuat alamat..."
                    : "Belum ada alamat",
                address:
                  loadingAddress || loadingAddresses
                    ? ""
                    : "Silakan tambahkan alamat pengiriman",
                phone: "",
                isPrimary: false,
              }
            }
            addresses={addressList}
            isLoading={loadingAddress || loadingAddresses}
            onSelectAddress={(address) => setSelectedAddressId(address.id)}
          />
          <ProductCard
            sellers={cartData?.sellers || []}
            notes={notes}
            onNotesChange={setNotes}
          />
          <ShippingOptions
            selectedShipping={selectedShipping}
            onSelectShipping={setSelectedShipping}
          />
          <VoucherCard
            selectedVoucher={selectedVoucher}
            onSelectVoucher={handleSelectVoucher}
            onApplyVoucher={handleApplyVoucher}
            onRemoveVoucher={handleRemoveVoucher}
          />
        </div>

        <div className="space-y-4 flex flex-col">
          <div className="order-1">
            <PaymentSummary
              selectedShipping={selectedShipping}
              selectedVoucher={selectedVoucher}
              selectedPayment={selectedPaymentMethod}
              onSelectPayment={setSelectedPaymentMethod}
              agreeTerms={agreeTerms}
              onAgreeTermsChange={setAgreeTerms}
              onPayment={handlePayment}
              isProcessing={isProcessing}
              calculatePrice={calculatePrice}
              calculateDiscount={calculateDiscount}
              calculateVoucherDiscount={() => selectedVoucher?.discount || 0}
              calculateTotal={calculateTotal}
              totalItems={checkoutItems.reduce((sum, item) => sum + item.quantity, 0)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
