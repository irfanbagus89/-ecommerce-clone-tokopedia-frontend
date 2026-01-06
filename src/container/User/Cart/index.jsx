import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import formatRupiah from "@/lib/currencyHelper";
import { useMyCart } from "@/services/User/Cart/getMyCart";
import { useCreateCart } from "@/services/User/DetailProduct/createCart";
import ProductCartSkeleton from "@/components/ui/productCartSkeleton";

const CartPage = () => {
  const { data, isLoading, mutate, error } = useMyCart();
  const [checkedItems, setCheckedItems] = useState({});
  const { trigger, isMutating } = useCreateCart();

  const sellers = data?.sellers || [];

  const isChecked = (id) => checkedItems[id] ?? true;

  const toggleItem = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !isChecked(id),
    }));
  };

  const isSellerChecked = (seller) => {
    return seller.items.every((item) => isChecked(item.cart_item_id));
  };

  const toggleSeller = (seller) => {
    const checked = isSellerChecked(seller);

    setCheckedItems((prev) => {
      const next = { ...prev };
      seller.items.forEach((item) => {
        next[item.cart_item_id] = !checked;
      });
      return next;
    });
  };

  const getItemPrice = (item) => {
    return item.price !== null ? item.price : item.original_price;
  };

  const getOriginalPrice = (item) => {
    if (!item.discount) return null;
    return item.original_price;
  };

  const totalQty = sellers.reduce((sum, seller) => {
    return (
      sum +
      seller.items.reduce((s, item) => {
        if (!isChecked(item.cart_item_id)) return s;
        return s + item.quantity;
      }, 0)
    );
  }, 0);

  const totalPrice = sellers.reduce((sum, seller) => {
    return (
      sum +
      seller.items.reduce((s, item) => {
        if (!isChecked(item.cart_item_id)) return s;
        return s + getItemPrice(item) * item.quantity;
      }, 0)
    );
  }, 0);

  const handleActionCart = async (sellerId, productId, variantId, qty) => {
    const payload = {
      sellerId: sellerId,
      productId: productId,
      variantId: variantId,
      quantity: Number(qty),
    };
    const res = await trigger(payload);
    if (res.Message.statusCode == 201) {
      mutate();
    }
  };

  return (
    <div className="container mx-auto py-2">
      {isLoading ? (
        <ProductCartSkeleton />
      ) : error.status == 404 ? (
        <></>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">Keranjang</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {sellers.map((seller) => (
                <Card key={seller.seller_id}>
                  <CardContent className="p-4 space-y-4 pt-0!">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        checked={isSellerChecked(seller)}
                        onCheckedChange={() => toggleSeller(seller)}
                      />
                      <span className="font-semibold">
                        {seller.seller_name}
                      </span>
                    </div>

                    <Separator />

                    {seller.items.map((item) => (
                      <div
                        key={item.cart_item_id}
                        className="flex items-center gap-4"
                      >
                        <Checkbox
                          className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                          checked={isChecked(item.cart_item_id)}
                          onCheckedChange={() => toggleItem(item.cart_item_id)}
                        />

                        <Image
                          src={item.image_url}
                          alt={item.product_name}
                          width={64}
                          height={64}
                          className="rounded"
                        />

                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {item.product_name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.variant_name}
                          </p>

                          <p className="font-bold mt-1">
                            {formatRupiah(getItemPrice(item))}
                          </p>

                          {item.discount && (
                            <div className="flex items-center gap-2 mt-1">
                              <span className="bg-red-100 text-red-600 text-xs font-bold px-1.5 rounded-sm">
                                {item.discount}%
                              </span>
                              <span className="text-xs text-gray-400 line-through">
                                {formatRupiah(getOriginalPrice(item))}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {item.quantity > 1 ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-none text-green-600 hover:text-green-700"
                              onClick={() =>
                                handleActionCart(
                                  seller.seller_id,
                                  item.product_id,
                                  item.variant_id,
                                  0
                                )
                              }
                            >
                              <Trash2 className="w-5 h-5 text-muted-foreground" />
                            </Button>
                          ) : (
                            <></>
                          )}
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-none text-green-600 hover:text-green-700"
                              onClick={() =>
                                handleActionCart(
                                  seller.seller_id,
                                  item.product_id,
                                  item.variant_id,
                                  item.quantity - 1
                                )
                              }
                            >
                              {item.quantity > 1 ? (
                                <Minus className="h-4 w-4" />
                              ) : (
                                <Trash2 className="w-5 h-5 text-muted-foreground" />
                              )}
                            </Button>

                            <span className="w-10 text-center font-bold">
                              {item.quantity}
                            </span>

                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={item.quantity >= item.stock}
                              className="rounded-none text-green-600 hover:text-green-700"
                              onClick={() =>
                                handleActionCart(
                                  seller.seller_id,
                                  item.product_id,
                                  item.variant_id,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="h-fit">
              <CardHeader className="font-semibold">
                Ringkasan belanja
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Total</span>
                  <span className="font-bold">
                    {totalQty > 0 ? formatRupiah(totalPrice) : "-"}
                  </span>
                </div>

                <Button variant="outline" className="w-full justify-between">
                  {totalQty > 0
                    ? "Lagi belum ada promo, nih"
                    : "Pilih barang dulu sebelum pakai promo"}
                  <span>›</span>
                </Button>

                <Button className="w-full" disabled={totalQty === 0}>
                  Beli {totalQty > 0 && `(${totalQty})`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
