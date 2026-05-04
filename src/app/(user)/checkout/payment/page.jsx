"use client";

import { Suspense } from "react";
import PaymentPage from "@/container/User/Checkout/Payment";
import AppLayout from "@/layout/UserLayout/AppLayout";
import { Loader2 } from "lucide-react";

const Page = () => {
  return (
    <AppLayout>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20 text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Memuat halaman pembayaran...
          </div>
        }
      >
        <PaymentPage />
      </Suspense>
    </AppLayout>
  );
};

export default Page;
