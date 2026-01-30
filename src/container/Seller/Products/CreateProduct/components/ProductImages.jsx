import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ProductImages = ({ images = [], onImageUpload, onRemoveImage, error }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Foto Produk</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={onImageUpload}
          disabled={images.length >= 5}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        {images.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {images.map((file, i) => {
              const src = typeof file === "string" ? file : URL.createObjectURL(file);
              return (
                <div key={i} className="relative">
                  <img src={src} alt={`preview-${i}`} className="w-full h-full object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => onRemoveImage(i)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductImages;
