import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import formatRupiah from "@/lib/utils/formatters";
import { getItemPrice, getOriginalPrice, hasDiscount } from "@/lib/utils/productPricing";
import { useMyCart } from "@/services/User/Cart/getMyCart";
import { useCreateCart } from "@/services/User/DetailProduct/createCart";
import { useUpdateCheckCart } from "@/services/User/Cart/updateCheckCart";
import ProductCartSkeleton from "@/components/ui/productCartSkeleton";
import Link from "next/link";

const CartPage = () => {
  const router = useRouter();
  const { data, isLoading, mutate } = useMyCart();
  const [checkedItems, setCheckedItems] = useState({});
  const { trigger, isMutating } = useCreateCart();
  const { trigger: triggerUpdateCheck } = useUpdateCheckCart();

  const sellers = data?.sellers || [];

  const isChecked = (item) => checkedItems[item.cart_item_id] ?? item.is_checked ?? true;

  const toggleItem = async (item) => {
    const newCheckedStatus = !isChecked(item);
    setCheckedItems((prev) => ({
      ...prev,
      [item.cart_item_id]: newCheckedStatus,
    }));

    try {
      await triggerUpdateCheck({ id: item.cart_item_id });
      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const isSellerChecked = (seller) => {
    if (!seller.items || seller.items.length === 0) return false;
    return seller.items.every((item) => isChecked(item));
  };

  const toggleSeller = async (seller) => {
    const checked = isSellerChecked(seller);
    const newCheckedStatus = !checked;

    setCheckedItems((prev) => {
      const next = { ...prev };
      seller.items.forEach((item) => {
        next[item.cart_item_id] = newCheckedStatus;
      });
      return next;
    });

    try {
      await Promise.all(
        seller.items.map((item) =>
          triggerUpdateCheck({ id: item.cart_item_id })
        )
      );
      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const totalQty = sellers.reduce((sum, seller) => {
    return (
      sum +
      seller.items.reduce((s, item) => {
        if (!isChecked(item)) return s;
        return s + item.quantity;
      }, 0)
    );
  }, 0);

  const totalPrice = sellers.reduce((sum, seller) => {
    return (
      sum +
      seller.items.reduce((s, item) => {
        if (!isChecked(item)) return s;
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
    if (res?.Metadata?.code == 201) {
      window.dispatchEvent(new Event("cartUpdated"));
      mutate();
    }
  };

  const handleProceedToPayment = () => {
    const checkedIds = sellers.flatMap((seller) =>
      seller.items
        .filter((item) => isChecked(item))
        .map((item) => item.cart_item_id)
    );
    if (checkedIds.length === 0) return;
    const params = new URLSearchParams({ ids: checkedIds.join(",") });
    router.push(`/checkout/payment?${params.toString()}`);
  };

  return (
    <div className="container mx-auto py-2">
      {isLoading ? (
        <ProductCartSkeleton />
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">Keranjang</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {sellers.length === 0 ? (
                <div className="w-full flex items-center justify-center p-6 sm:p-12 border border-gray-100 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.05)] bg-white mt-4">
                  <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                    <div className="relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] shrink-0">
                      <Image
                        src="https://lf-web-assets.tokopedia-static.net/obj/tokopedia-web-sg/backfunnel_v3/4d27af6a.svg"
                        alt="Keranjang Kosong"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                      <h2 className="text-xl sm:text-[22px] font-bold text-[#31353B] mb-1.5 leading-tight">
                        Wah, keranjang belanjamu kosong
                      </h2>
                      <p className="text-[#6D7588] text-sm sm:text-base mb-6">
                        Yuk, isi dengan barang-barang impianmu!
                      </p>
                      <Link href={"/"}>
                        <Button className="bg-[#00AA5B] hover:bg-[#008f4c] text-white font-bold h-10 px-10 rounded-lg text-sm">
                          Mulai Belanja
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                sellers.map((seller) => (
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
                          className="flex items-start gap-3"
                        >
                          <Checkbox
                            className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 mt-1 shrink-0"
                            checked={isChecked(item)}
                            onCheckedChange={() =>
                              toggleItem(item)
                            }
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex gap-3">
                              <Link
                                href={`/product/${item.category_id}/${item.product_id}`}
                              >
                                <Image
                                  src={item.image_url}
                                  alt={item.product_name}
                                  width={64}
                                  height={64}
                                  className="rounded shrink-0"
                                />
                              </Link>
                              <div className="flex-1 min-w-0">
                                <Link
                                  href={`/product/${item.category_id}/${item.product_id}`}
                                >
                                  <p className="text-sm font-medium line-clamp-2">
                                    {item.product_name}
                                  </p>
                                </Link>
                                <p className="text-xs text-muted-foreground">
                                  {item.variant_name}
                                </p>
                                <p className="font-bold mt-1">
                                  {formatRupiah(getItemPrice(item))}
                                </p>
                                {hasDiscount(item) && (
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
                            </div>
                            <div className="flex items-center justify-end gap-2 mt-2">
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
                                      0,
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
                                      item.quantity - 1,
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
                                      item.quantity + 1,
                                    )
                                  }
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            <Card className="h-fit mt-4">
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
                <Button
                  className="w-full"
                  disabled={totalQty === 0}
                  onClick={handleProceedToPayment}
                >
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
