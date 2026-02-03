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

const PaymentPage = () => {
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
          <AddressCard />
          <ProductCard />
          <ShippingOptions />
          <VoucherCard />
        </div>

        {/* Right Column - Payment & Summary */}
        <div className="space-y-4 flex flex-col">
          <div className="order-2 lg:order-1">
            <PaymentSummary />
          </div>

          <div className="order-1 lg:order-2">
            <PaymentMethod />
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
