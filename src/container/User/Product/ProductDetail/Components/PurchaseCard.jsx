"use client";

import { useState } from "react";
import { Minus, Plus, Heart, Share2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import formatRupiah from "@/lib/currencyHelper";

const PurchaseCard = ({ product, selectedVariant }) => {
  const [qty, setQty] = useState(1);
  const activeVariant =
    product?.variants.find((v) => v.id === selectedVariant) ?? 0;

  const handleQtyChange = (val) => {
    let newQty = parseInt(val);
    if (isNaN(newQty)) return;
    if (newQty < 1) newQty = 1;
    if (newQty > activeVariant.stock) newQty = activeVariant.stock;
    setQty(newQty);
  };

  return (
    <Card className="shadow-lg border-gray-200 rounded-xl overflow-hidden">
      <CardContent className="">
        <h3 className="font-bold text-gray-900 mb-4 text-base">
          Atur jumlah dan catatan
        </h3>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center border rounded-lg border-gray-300">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none text-gray-500 hover:text-green-600"
              onClick={() => handleQtyChange(qty - 1)}
              disabled={qty <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="h-8 w-12 border-0 text-center focus-visible:ring-0 p-0 text-sm font-bold leading-8">
              {qty}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none text-green-600 hover:text-green-700"
              onClick={() => handleQtyChange(qty + 1)}
              disabled={qty >= activeVariant.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-sm text-gray-500">
            Stok:{" "}
            <span className="font-bold text-gray-800">
              {activeVariant.stock}
            </span>
          </span>
        </div>

        <div className="mb-6">
          <button className="flex items-center gap-1 text-sm text-green-600 font-medium hover:underline">
            <Pencil className="w-3 h-3" /> Tambah Catatan
          </button>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-500 font-medium">Subtotal</span>
          <span className="font-bold text-xl text-gray-900">
            {product.price !== null
              ? formatRupiah((product.price + activeVariant.price) * qty)
              : formatRupiah(
                  (product.original_price + activeVariant.price) * qty
                )}
          </span>
        </div>

        <div className="space-y-3">
          <Button className="w-full bg-green-600 hover:bg-green-700 font-bold h-11 text-md rounded-lg">
            + Keranjang
          </Button>
          <Button
            variant="outline"
            className="w-full border-green-600 text-green-600 hover:bg-green-50 font-bold h-11 text-md rounded-lg"
          >
            Beli Langsung
          </Button>
        </div>

        <div className="flex justify-between mt-4 pt-4 border-t text-sm font-semibold text-gray-600">
          <button className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" /> Wishlist
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseCard;
