"use client";
import ProductCard from "@/components/ui/productCard";
import ProductCardSkeleton from "@/components/ui/productCardSkeleton";
import { useRekomendasiProductByStore } from "@/services/User/DetailProduct/getRekomendasiProductByStore";
import Link from "next/link";
import React from "react";

const ProductRekomendasiSection = ({ sellerId, categoryId, id }) => {
  const { data: rekomendasiByStore, isLoading: rekomendasiByStoreLoading } =
    useRekomendasiProductByStore(1, 10, sellerId, categoryId, id);
  return (
    <section className="py-10" id="product-rekomendasi">
      <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase">
        Lainnya di Toko Ini
      </h2>
      {rekomendasiByStoreLoading ? (
        <div className="grid grid-cols-5 gap-4">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {rekomendasiByStore?.Data?.products?.map((prod) => (
            <Link
              key={prod.id}
              href={`/product/${prod.category_id}/${prod.id}`}
            >
              <ProductCard data={prod} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductRekomendasiSection;
