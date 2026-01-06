"use client";

import { useState } from "react";
import ProductInfo from "./ProductInfo";
import PurchaseCard from "./PurchaseCard";
import ProductGallery from "./ProductGallery";

const ProductDetail = ({ product, data }) => {
  const [activeVariant, setActiveVariant] = useState(
    product.variants[0].id
  );

  return (
    <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-4">
        <ProductGallery images={product.images} />
      </div>

      <div className="lg:col-span-5">
        <ProductInfo
          product={product}
          setActiveVariant={setActiveVariant}
        />
      </div>

      <div className="lg:col-span-3">
        <PurchaseCard
          product={product}
          selectedVariant={activeVariant}
          data={data}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
