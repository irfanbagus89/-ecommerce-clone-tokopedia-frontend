"use client";

import { useParams } from "next/navigation";
import { CustomBreadcrumb } from "@/components/ui/breadcrumb";
import ProductGallery from "./Components/ProductGallery";
import ProductInfo from "./Components/ProductInfo";
import PurchaseCard from "./Components/PurchaseCard";
import ProductReviews from "./Components/ProductReview";
import { useProductDetail } from "@/services/User/DetailProduct/getDetailProduct";
import { useState } from "react";

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params.id;
  const { data, isLoading } = useProductDetail(productId);
  const [activeVariant, setActiveVariant] = useState(0);
  const product = {
    id: data?.id,
    title: data?.name,
    description: data?.description,
    price: data?.price,
    originalPrice: Number(data?.original_price),
    discount: data?.discount_percent,
    rating: data?.rating.average,
    ratingCount: data?.rating.count,
    soldCount: data?.sold_count,
    stock: data?.stock,
    images: data?.images,
    variants: data?.variants,
  };
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    {
      label: data?.category.name,
      href: `/product/${data?.category.id}`,
    },
    { label: product.title },
  ];

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="container mx-auto px-4 py-4">
            <CustomBreadcrumb items={breadcrumbItems} />
          </div>

          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <ProductGallery images={product.images} />
                </div>
              </div>

              <div className="lg:col-span-5">
                <ProductInfo
                  product={product}
                  setActiveVariant={setActiveVariant}
                />
              </div>

              <div className="hidden lg:block lg:col-span-3">
                <div className="sticky top-24">
                  <PurchaseCard product={product} selectedVariant={activeVariant}/>
                </div>
              </div>
            </div>
          </div>

          <ProductReviews productId={product.id}/>
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;
