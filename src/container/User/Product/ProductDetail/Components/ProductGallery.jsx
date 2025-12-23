"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils"; 

const ProductGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-gray-100 bg-white">
        <Image
          src={images[selectedImage]}
          alt="Product Main"
          fill
          className="object-contain p-4 transition-transform duration-300 hover:scale-105"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-white cursor-pointer",
              selectedImage === index
                ? "ring-2 ring-green-600 border-transparent"
                : "border-gray-200 hover:border-green-600"
            )}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index}`}
              fill
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;