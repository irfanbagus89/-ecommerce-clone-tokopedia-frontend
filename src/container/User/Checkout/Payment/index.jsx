"use client";

import { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AddressCard from "./Components/AddressCard";
import PaymentSummary from "./Components/PaymentSummary";
import ProductCard from "./Components/ProductCard";
import ShippingOptions from "./Components/ShippingOptions";
import VoucherCard from "./Components/VoucherCard";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { CustomBreadcrumb } from "@/components/ui/breadcrumb";
import {
  useAddresses,
  useDefaultAddress,
} from "@/services/User/Addresses/addressActions";
import { useCheckout } from "@/services/User/Checkout/checkoutActions";
import { useMyCart } from "@/services/User/Cart/getMyCart";
import { useValidateVoucher } from "@/services/User/Vouchers/validateVoucher";
import { toast } from "@/lib/toast";

/**
 * Load Midtrans Snap script sekali ke DOM.
 * Sandbox: https://app.sandbox.midtrans.com/snap/snap.js
 * Production: https://app.midtrans.com/snap/snap.js
 */
function loadSnapScript(clientKey) {
  return new Promise((resolve, reject) => {
    if (window.snap) return resolve();
    const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_ENV === "production";
    const script = document.createElement("script");
    script.src = isProduction
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", clientKey);
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Ambil cart_item_ids dari URL query params (?ids=id1,id2,...)
  const cartItemIds = searchParams.get("ids")
    ? searchParams.get("ids").split(",").filter(Boolean)
    : [];

  // Alamat default dari API
  const { data: defaultAddress, isLoading: loadingAddress } =
    useDefaultAddress();
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("midtrans");
  const [notes, setNotes] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Hook SWR mutation untuk POST checkout
  const { trigger: triggerCheckout } = useCheckout();

  // Fetch Cart Items
  const { data: cartData, isLoading: loadingCart } = useMyCart();
  const { trigger: triggerValidateVoucher } = useValidateVoucher();

  // Memfilter item keranjang yang dipilih
  const allCartItems =
    cartData?.sellers?.flatMap((seller) => seller.items) || [];
  const checkoutItems = allCartItems.filter((item) =>
    cartItemIds.includes(String(item.cart_item_id)),
  );
  const addressList = addresses || [];
  const selectedAddress =
    addressList.find((address) => address.id === selectedAddressId) ||
    defaultAddress ||
    null;

  const products = checkoutItems.map((item) => ({
    id: item.cart_item_id,
    name: item.product_name,
    variant: item.variant_name,
    image: item.image_url || "/placeholder.png",
    originalPrice: item.original_price,
    discountedPrice: item.price || item.original_price,
    discountPercent: item.discount || 0,
    quantity: item.quantity,
    stock: item.stock,
  }));

  const calculateOriginalTotal = useCallback(() => {
    return products.reduce(
      (acc, curr) => acc + curr.originalPrice * curr.quantity,
      0,
    );
  }, [products]);

  const calculateSubtotal = useCallback(() => {
    return products.reduce(
      (acc, curr) => acc + curr.discountedPrice * curr.quantity,
      0,
    );
  }, [products]);

  const calculateDiscount = useCallback(() => {
    return calculateOriginalTotal() - calculateSubtotal();
  }, [calculateOriginalTotal, calculateSubtotal]);

  // Hitung total dari subtotal + ongkir - voucher
  const calculateTotal = useCallback(() => {
    const subtotal = calculateSubtotal();
    const shipping = selectedShipping?.price || 0;
    const voucher = selectedVoucher?.discount || 0;
    // Asuransi dan biaya layanan bisa ditambahkan jika dinamis
    return subtotal + shipping + voucher + 2000 + 3200;
  }, [calculateSubtotal, selectedShipping, selectedVoucher]);

  const handleSelectVoucher = (voucher) => setSelectedVoucher(voucher);

  const handleApplyVoucher = async (code) => {
    if (!code) return;
    try {
      const res = await triggerValidateVoucher({
        code,
        total: calculateSubtotal(),
      });
      if (res?.data) {
        setSelectedVoucher({
          code: res.data.code,
          title: `Diskon ${res.data.discount_amount}`,
          discount: -res.data.discount_amount, // Asumsikan backend mengembalikan nilai absolut diskon
          maxDiscount: res.data.max_discount || 0,
          type: res.data.discount_type,
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
   * Alur pembayaran:
   * 1. Panggil POST /api/v1/orders/checkout → dapat snap_token dari backend
   * 2. Load Midtrans Snap script jika belum
   * 3. Buka Snap popup dengan snap_token
   * 4. Handle callback success/pending/error dari Snap
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
      // Step 1: Checkout ke backend → dapat snap_token
      const payload = {
        cart_item_ids: cartItemIds,
        address: selectedAddress.address,
        city: selectedAddress.city_name || selectedAddress.city || "",
        postal_code: selectedAddress.postal_code || "",
      };
      if (
        selectedPaymentMethod &&
        selectedPaymentMethod !== "midtrans"
      ) {
        payload.payment_method_code = selectedPaymentMethod;
      }
      if (selectedVoucher?.code) {
        payload.voucher_code = selectedVoucher.code;
      }
      const res = await triggerCheckout(payload);

      const snapToken = res?.Data?.data?.token ?? res?.data?.token;
      if (!snapToken) {
        throw new Error("Snap token tidak ditemukan dari server.");
      }

      // Step 2: Load Midtrans Snap script
      await loadSnapScript(MIDTRANS_CLIENT_KEY);

      // Step 3: Buka Snap popup
      window.snap.pay(snapToken, {
        onSuccess: (result) => {
          console.log("Payment success:", result);
          toast.success("Pembayaran berhasil! Pesanan sedang diproses.");
          router.push("/orders");
        },
        onPending: (result) => {
          console.log("Payment pending:", result);
          toast.info("Pembayaran tertunda. Selesaikan pembayaran Anda.");
          router.push("/orders");
        },
        onError: (result) => {
          console.error("Payment error:", result);
          toast.error("Pembayaran gagal. Silakan coba lagi.");
        },
        onClose: () => {
          console.log("Snap popup closed");
          toast.info("Popup pembayaran ditutup.");
        },
      });
    } catch (err) {
      console.error("Checkout error:", err);
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Terjadi kesalahan saat memproses pembayaran.";
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Jika tidak ada item yang dipilih, redirect ke cart
  if (!cartItemIds.length) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground mb-4">
          Tidak ada item yang dipilih untuk pembayaran.
        </p>
        <Link
          href="/checkout/cart"
          className="text-green-600 hover:underline font-medium"
        >
          ← Kembali ke Keranjang
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Breadcrumb */}
      <div className="mb-6">
        <CustomBreadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Keranjang", href: "/checkout/cart" },
            { label: "Pembayaran" },
          ]}
        />
      </div>

      {/* Header */}
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
            <span>Memproses pembayaran...</span>
          </div>
        )}
      </div>

      {/* Info: jumlah item */}
      <div className="mb-4 text-sm text-muted-foreground">
        {cartItemIds.length} item dipilih dari keranjang
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Details */}
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
            products={products}
            notes={notes}
            onNotesChange={setNotes}
            cartItemIds={cartItemIds}
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

        {/* Right Column - Payment Summary */}
        <div className="space-y-4 flex flex-col">
          <div className="order-1">
            <PaymentSummary
              products={products}
              selectedShipping={selectedShipping}
              selectedVoucher={selectedVoucher}
              selectedPayment={selectedPaymentMethod}
              onSelectPayment={setSelectedPaymentMethod}
              agreeTerms={agreeTerms}
              onAgreeTermsChange={setAgreeTerms}
              onPayment={handlePayment}
              isProcessing={isProcessing}
              calculateSubtotal={calculateSubtotal}
              calculateOriginalTotal={calculateOriginalTotal}
              calculateDiscount={calculateDiscount}
              calculateVoucherDiscount={() => selectedVoucher?.discount || 0}
              calculateTotal={calculateTotal}
              cartItemCount={cartItemIds.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
