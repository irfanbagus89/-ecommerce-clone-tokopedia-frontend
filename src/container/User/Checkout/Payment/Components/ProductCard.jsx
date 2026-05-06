import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Store, Shield } from "lucide-react";
import formatRupiah from "@/lib/utils/formatters";
import { getItemPrice, hasDiscount } from "@/lib/utils/productPricing";

const ProductCard = ({ sellers = [], notes, onNotesChange }) => {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        {sellers.length === 0 ? (
          <div className="text-sm text-muted-foreground bg-gray-50 rounded-lg p-4 text-center">
            <p className="font-medium text-gray-700 mb-1">Memuat produk...</p>
          </div>
        ) : (
          sellers.map((seller, sellerIndex) => (
            <div key={seller.seller_id} className="space-y-4">
              {/* Seller Info */}
              <div className="flex items-center gap-2 pb-2 border-b">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shrink-0">
                  <Store className="w-4 h-4 text-white" />
                </div>
                <p className="font-semibold text-sm">{seller.seller_name}</p>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {seller.items.map((item, index) => {
                  const itemPrice = getItemPrice(item);
                  return (
                    <div key={item.cart_item_id}>
                      <div className="flex gap-3">
                        <div className="relative shrink-0">
                          <Image
                            src={item.image_url}
                            width={80}
                            height={80}
                            alt={item.product_name}
                            className="rounded-lg border object-cover"
                          />
                          {hasDiscount(item) ? (
                            <Badge className="absolute -top-2 -left-2 bg-red-500 text-xs">
                              {item.discount}%
                            </Badge>
                          ) : null}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm leading-snug line-clamp-2">
                            {item.product_name}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            {item.variant_name && (
                              <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-0.5 rounded">
                                {item.variant_name}
                              </span>
                            )}
                            <span className="text-xs text-muted-foreground">
                              Stok: {item.stock}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div>
                              {hasDiscount(item) && (
                                <span className="line-through text-xs text-muted-foreground">
                                  {formatRupiah(item.original_price)}
                                </span>
                              )}
                              <p className="font-semibold text-green-600">
                                {formatRupiah(itemPrice)}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <span className="text-gray-400">x</span>
                              <span className="font-medium">{item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < seller.items.length - 1 && <Separator className="mt-4" />}
                    </div>
                  );
                })}
              </div>

              {sellerIndex < sellers.length - 1 && <Separator />}
            </div>
          ))
        )}

        {/* Shipping Protection */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-sm text-blue-800">Proteksi Pembeli</p>
              <p className="text-xs text-blue-700 mt-0.5">
                Jaminan uang kembali jika barang tidak sesuai atau tidak diterima
              </p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Catatan untuk Penjual
          </label>
          <Input
            placeholder="Contoh: Tolong bungkus dengan bubble wrap"
            className="text-sm"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
