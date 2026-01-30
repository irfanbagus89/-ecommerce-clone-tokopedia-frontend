import React from "react";
import ProductGallery from "@/container/User/Product/ProductDetail/Components/ProductGallery";
import ProductInfo from "@/container/User/Product/ProductDetail/Components/ProductInfo";

const ProductPreview = ({ previewProduct }) => {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <h2 className="font-bold mb-3">Preview Produk</h2>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-5">
          <ProductGallery images={previewProduct.images} />
        </div>
        <div className="col-span-7">
          <ProductInfo product={previewProduct} />
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
