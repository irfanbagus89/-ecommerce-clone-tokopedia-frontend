import AddressCard from "./Components/AddressCard";
import PaymentMethod from "./Components/PaymentMethod";
import PaymentSummary from "./Components/PaymentSummary";
import ProductCard from "./Components/ProductCard";
import ShippingOptions from "./Components/ShippingOptions";
import VoucherCard from "./Components/VoucherCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";

const PaymentPage = () => {
  // State untuk menyimpan data pembayaran
  const [selectedAddress, setSelectedAddress] = useState({
    id: 1,
    label: "Rumah - Irfan Bagus",
    name: "Irfan Bagus",
    phone: "081234567890",
    address: "Jl. Tambak Asri Gang 32 No. 15, RT.05/RW.02, Kel. Krembangan, Kec. Krembangan, Kota Surabaya, Jawa Timur 60175",
    isPrimary: true,
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Kursi Kantor Minimalis Ergonomis - Mesh Back Support",
      image: "https://picsum.photos/seed/chair/600/600",
      originalPrice: 899000,
      discountedPrice: 479000,
      discountPercent: 47,
      quantity: 1,
      variant: "Hitam",
      stock: 50,
    },
    {
      id: 2,
      name: "Meja Kerja Modern - Kayu Jati Solid",
      image: "https://picsum.photos/seed/desk/600/600",
      originalPrice: 1250000,
      discountedPrice: 899000,
      discountPercent: 28,
      quantity: 1,
      variant: "Natural",
      stock: 25,
    },
  ]);

  const [selectedShipping, setSelectedShipping] = useState({
    courier: "jne_reg",
    name: "JNE Regular",
    price: 9000,
    estimated: "2-3 Hari",
    type: "Reguler",
  });

  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const [selectedPayment, setSelectedPayment] = useState("gopay");

  const [showInstallment, setShowInstallment] = useState(false);

  const [selectedInstallment, setSelectedInstallment] = useState(null);

  const [notes, setNotes] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(false);

  // Fungsi untuk menghitung total harga
  const calculateSubtotal = () => {
    return products.reduce((sum, product) => sum + (product.discountedPrice * product.quantity), 0);
  };

  const calculateOriginalTotal = () => {
    return products.reduce((sum, product) => sum + (product.originalPrice * product.quantity), 0);
  };

  const calculateDiscount = () => {
    return calculateOriginalTotal() - calculateSubtotal();
  };

  const calculateVoucherDiscount = () => {
    if (!selectedVoucher) return 0;
    return selectedVoucher.discount || 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + selectedShipping.price + calculateVoucherDiscount();
  };


  // Fungsi untuk memilih voucher
  const handleSelectVoucher = (voucher) => {
    setSelectedVoucher(voucher);
  };

  // Fungsi untuk memasukkan kode voucher
  const handleApplyVoucher = (code) => {
    // Simulasi: bisa diganti dengan API call sebenarnya
    if (code.toUpperCase() === "HEMAT10") {
      setSelectedVoucher({
        code: "HEMAT10",
        title: "Diskon 10%",
        discount: -10000,
        maxDiscount: 20000,
        type: "percentage",
      });
    }
  };

  // Fungsi untuk menghapus voucher
  const handleRemoveVoucher = () => {
    setSelectedVoucher(null);
  };

  // Fungsi untuk memproses pembayaran
  const handlePayment = () => {
    if (!agreeTerms) {
      alert("Mohon setujui syarat & ketentuan terlebih dahulu");
      return;
    }

    // Simulasi proses pembayaran
    const paymentData = {
      address: selectedAddress,
      products: products,
      shipping: selectedShipping,
      voucher: selectedVoucher,
      paymentMethod: selectedPayment,
      installment: selectedInstallment,
      notes: notes,
      total: calculateTotal(),
    };

    console.log("Data Pembayaran:", paymentData);
    alert("Pembayaran berhasil diproses!");
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-sm">
                Beranda
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/checkout/cart" className="text-sm">
                Keranjang
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-medium">
                Pembayaran
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/checkout/cart">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Kembali</span>
          </button>
        </Link>
        <h1 className="text-xl font-bold">Pembayaran</h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-4">
          <AddressCard
            selectedAddress={selectedAddress}
            onSelectAddress={setSelectedAddress}
          />
          <ProductCard
            products={products}
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

        {/* Right Column - Payment & Summary */}
        <div className="space-y-4 flex flex-col">
          <div className="order-2 lg:order-1">
            <PaymentSummary
              products={products}
              selectedShipping={selectedShipping}
              selectedVoucher={selectedVoucher}
              selectedPayment={selectedPayment}
              agreeTerms={agreeTerms}
              onAgreeTermsChange={setAgreeTerms}
              onPayment={handlePayment}
              calculateSubtotal={calculateSubtotal}
              calculateOriginalTotal={calculateOriginalTotal}
              calculateDiscount={calculateDiscount}
              calculateVoucherDiscount={calculateVoucherDiscount}
              calculateTotal={calculateTotal}
            />
          </div>

          <div className="order-1 lg:order-2">
            <PaymentMethod
              selectedPayment={selectedPayment}
              onSelectPayment={setSelectedPayment}
              showInstallment={showInstallment}
              onToggleInstallment={setShowInstallment}
              selectedInstallment={selectedInstallment}
              onSelectInstallment={setSelectedInstallment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
