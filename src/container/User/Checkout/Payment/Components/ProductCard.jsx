import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Store,
  Star,
  MapPin,
  Shield,
  CheckCircle,
  MessageCircle,
} from "lucide-react";

const ProductCard = ({ products, notes, onNotesChange, cartItemIds = [] }) => {
  const store = {
    name: "Furniture Official Store",
    isOfficial: true,
    isStar: true,
    location: "Jakarta Utara",
    rating: 4.9,
    totalReviews: 2847,
    chatResponse: "Kurang dari 1 jam",
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        {/* Store Info */}
        <div className="flex items-center justify-between pb-3 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm">{store.name}</p>
                {store.isOfficial && (
                  <Badge className="bg-green-600 text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Official
                  </Badge>
                )}
                {store.isStar && (
                  <Badge className="bg-yellow-500 text-xs">
                    <Star className="w-3 h-3 mr-1 fill-white" />
                    Power Merchant
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{store.rating}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{store.location}</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-green-600 border-green-600 hover:bg-green-50"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Chat
          </Button>
        </div>

        {/* Products List */}
        <div className="space-y-4">
          {products.length === 0 ? (
            <div className="text-sm text-muted-foreground bg-gray-50 rounded-lg p-4 text-center">
              <p className="font-medium text-gray-700 mb-1">
                {cartItemIds.length} item dipilih dari keranjang
              </p>
              <p className="text-xs">
                Detail produk dan total harga akan dikonfirmasi saat Anda menekan &quot;Bayar Sekarang&quot; dan halaman pembayaran Midtrans terbuka.
              </p>
            </div>
          ) : (
            products.map((product, index) => (
              <div key={product.id}>
                <div className="flex gap-3">
                  <div className="relative">
                    <Image
                      src={product.image}
                      width={80}
                      height={80}
                      alt={product.name}
                      className="rounded-lg border"
                    />
                    {product.discountPercent > 0 && (
                      <Badge className="absolute -top-2 -left-2 bg-red-500 text-xs">
                        {product.discountPercent}%
                      </Badge>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-snug line-clamp-2">
                      {product.name}
                    </p>

                    <div className="flex items-center gap-2 mt-1.5">
                      {product.variant && (
                        <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-0.5 rounded">
                          {product.variant}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        Stok: {product.stock}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div>
                        {product.discountPercent > 0 && (
                          <span className="line-through text-xs text-muted-foreground">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                        <p className="font-semibold text-green-600">
                          {formatPrice(product.discountedPrice)}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span className="text-gray-400">x</span>
                        <span className="font-medium">{product.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {index < products.length - 1 && <Separator className="mt-4" />}
              </div>
            ))
          )}
        </div>

        {/* Shipping Protection */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-sm text-blue-800">
                Proteksi Pembeli
              </p>
              <p className="text-xs text-blue-700 mt-0.5">
                Jaminan uang kembali jika barang tidak sesuai atau tidak
                diterima
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
