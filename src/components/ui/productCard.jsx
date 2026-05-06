"use client";

import React from "react";
import { MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import formatRupiah from "@/lib/utils/formatters";
import Image from "next/image";

function ProductCard({ className, data, ...props }) {
  const {
    image_url,
    name,
    price,
    original_price,
    discount,
    rating,
    sold,
    location,
    flashSale,
  } = data;

  return (
    <Card
      className={cn(
        "group flex h-full flex-col overflow-hidden border-none shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer gap-0! pt-0!",
        className
      )}
      {...props}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={image_url}
          alt={name}
          fill
          sizes="width: 100%, height:100%"
          style={{ objectFit: "cover" }}
        />
      </div>

      <CardContent className="flex flex-1 flex-col justify-between gap-2 p-3">
        <div>
          <h3 className="mb-2 line-clamp-2 text-sm font-medium leading-tight text-gray-800">
            {name}
          </h3>

          {price !== null ? (
            <div className="flex flex-col">
              <span className="text-base font-bold text-gray-900">
                {formatRupiah(price)}
              </span>

              <div className="mt-0.5 flex items-center gap-1">
                {discount && !flashSale?.isActive && (
                  <span className="rounded bg-red-100 px-1 text-[10px] font-bold text-red-600">
                    {discount}%
                  </span>
                )}
                <span className="text-xs text-gray-400 line-through">
                  {formatRupiah(original_price)}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="text-base font-bold text-gray-900">
                {formatRupiah(original_price)}
              </span>
            </div>
          )}
        </div>

        {flashSale?.isActive ? (
          <div className="mt-2 space-y-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-red-500"
                style={{ width: `${flashSale.stockProgress}%` }}
              />
            </div>
            <p className="text-xs font-medium text-gray-500">
              {flashSale.statusText || "Segera Habis"}
            </p>
          </div>
        ) : (
          <div className="mt-1 space-y-1">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              {rating !== null && rating !== undefined && (
                <div className="flex items-center text-gray-600">
                  <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{rating}</span>
                </div>
              )}
              {rating !== null &&
                rating !== undefined &&
                sold !== null &&
                sold !== undefined && <span className="mx-0.5">|</span>}
              {sold !== null && sold !== undefined && (
                <span>Terjual {sold}</span>
              )}
            </div>

            {location && (
              <div className="mt-1 flex items-center gap-1 text-xs text-green-600">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{location}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
export default ProductCard;
