"use client";

import { Suspense } from "react";
import ProductSearchPage from "@/container/User/Search";
import AppLayout from "@/layout/UserLayout/AppLayout";

const page = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div className="flex items-center justify-center h-40"><div className="w-8 h-8 border-2 border-[#03AC0E] border-t-transparent rounded-full animate-spin" /></div>}>
        <ProductSearchPage />
      </Suspense>
    </AppLayout>
  );
};

export default page;
