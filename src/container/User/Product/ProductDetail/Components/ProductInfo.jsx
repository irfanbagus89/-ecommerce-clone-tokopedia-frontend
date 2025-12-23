"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import formatRupiah from "@/lib/currencyHelper";

const ProductInfo = ({ product, setActiveVariant }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const descRef = useRef(null);
  const [isClamped, setIsClamped] = useState(false);

  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants[0]?.id
  );
  const activeVariant = product?.variants.find((v) => v.id === selectedVariant);

  useEffect(() => {
    setActiveVariant(selectedVariant);
  }, [selectedVariant, setActiveVariant]);

  useLayoutEffect(() => {
    if (!descRef.current) return;

    const el = descRef.current;
    const isOverflowing = el.scrollHeight > el.clientHeight;

    setIsClamped(isOverflowing);
  }, [product.description]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-gray-900 leading-snug">
        {product.title}
      </h1>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="text-gray-500 font-medium">
          Terjual {product.soldCount}
        </span>
        <span className="text-gray-300">•</span>
        <div className="flex items-center gap-1 border px-2 py-0.5 rounded-md border-gray-200">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-gray-900">{product.rating}</span>
          <span className="text-gray-400">({product.ratingCount})</span>
        </div>
      </div>

      <div className="mt-2">
        <h2 className="text-3xl font-extrabold text-gray-900">
          {product.price !== null
            ? formatRupiah(product.price + activeVariant.price)
            : formatRupiah(product.original_price + activeVariant.price)}
        </h2>

        {product.discount ? (
          <div className="mt-1 flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-red-100 text-red-600 font-bold px-1.5 rounded-sm"
            >
              {product.discount}%
            </Badge>
            <span className="text-sm text-gray-400 line-through font-medium">
              {formatRupiah(product.originalPrice)}
            </span>
          </div>
        ) : null}
      </div>

      <Separator className="my-2" />

      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-900">
          Pilih tipe:
          <span className="font-normal text-gray-500">
            {activeVariant.name}
          </span>
        </h3>

        <div className="flex flex-wrap gap-3">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                selectedVariant === variant.id
                  ? "border-green-600 bg-green-50 text-green-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              )}
            >
              {variant.name}
            </button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="detail" className="w-full border-t">
        <TabsList className="w-full justify-start border-b bg-transparent p-0">
          <TabsTrigger value="detail">Detail Produk</TabsTrigger>
        </TabsList>

        <TabsContent value="detail" className="pt-4 text-sm text-gray-700">
          <p
            className={cn(
              "whitespace-pre-line",
              !showFullDesc && "line-clamp-4"
            )}
          >
            {product.description}
          </p>
          {isClamped && (
            <button
              onClick={() => setShowFullDesc((prev) => !prev)}
              className="mt-2 font-bold text-green-600"
            >
              {showFullDesc ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
            </button>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductInfo;
