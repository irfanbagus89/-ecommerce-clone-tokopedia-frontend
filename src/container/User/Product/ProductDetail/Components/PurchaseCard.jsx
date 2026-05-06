"use client";

import { useState } from "react";
import { Minus, Plus, Heart, Share2, Pencil, MessageCircle } from "lucide-react";
import { useSWRConfig } from "swr";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import formatRupiah from "@/lib/utils/formatters";
import { useCreateCart } from "@/services/User/DetailProduct/createCart";
import {
  useSendMessage,
  useStartConversation,
} from "@/services/User/Chat/chatActions";
import {
  useAddToWishlist,
  useCheckWishlist,
  useRemoveFromWishlist,
} from "@/services/User/Wishlists/wishlistActions";
import { useAuthContext } from "@/contexts/AuthProvider";
import { LoginModal } from "@/components/ui/login-modal";
import { toast } from "@/lib/toast";

const getWishlistStatus = (data) => {
  if (typeof data === "boolean") return data;
  return Boolean(
    data?.is_wishlist ||
      data?.is_wishlisted ||
      data?.wishlisted ||
      data?.exists ||
      data?.in_wishlist,
  );
};

const PurchaseCard = ({ product, selectedVariant, data }) => {
  const [qty, setQty] = useState(1);
  const { isLoggedIn } = useAuthContext();
  const { mutate } = useSWRConfig();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");
  const activeVariant =
    product?.variants.find((v) => v.id === selectedVariant) ?? 0;

  const { trigger, isMutating } = useCreateCart();
  const { trigger: startConversation, isMutating: isStartingChat } =
    useStartConversation();
  const { trigger: sendMessage, isMutating: isSendingProductChat } =
    useSendMessage();
  const { data: wishlistStatus, mutate: revalidateWishlistStatus } =
    useCheckWishlist(data.id, isLoggedIn);
  const { trigger: addToWishlist, isMutating: isAddingWishlist } =
    useAddToWishlist(data.id);
  const { trigger: removeFromWishlist, isMutating: isRemovingWishlist } =
    useRemoveFromWishlist(data.id);

  const isWishlisted = getWishlistStatus(wishlistStatus);
  const isUpdatingWishlist = isAddingWishlist || isRemovingWishlist;

  const handleQtyChange = (val) => {
    let newQty = parseInt(val);
    if (isNaN(newQty)) return;
    if (newQty < 1) newQty = 1;
    if (newQty > activeVariant.stock) newQty = activeVariant.stock;
    setQty(newQty);
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    const payload = {
      sellerId: data.seller.id,
      productId: data.id,
      variantId: activeVariant.id,
      quantity: Number(qty),
      type: "insert",
    };

    try {
      const res = await trigger(payload);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("ADD TO CART ERROR:", error);
    }
  };

  const handleStartChat = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    try {
      const conversation = await startConversation({
        seller_id: data.seller.id,
        product_id: data.id,
      });
      const conversationId =
        conversation?.id || conversation?.conversation_id || conversation?.data?.id;

      if (conversationId) {
        await sendMessage({
          conversationId,
          message: `Halo, saya ingin bertanya tentang produk ini.\nProduk: ${product.title}\nVarian: ${activeVariant.name}`,
        });
      }

      window.dispatchEvent(
        new CustomEvent("chat:open", {
          detail: {
            conversationId,
          },
        }),
      );
    } catch (error) {
      console.error("START CHAT ERROR:", error);
    }
  };

  const handleToggleWishlist = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (isWishlisted) {
        await removeFromWishlist();
        toast.success("Produk dihapus dari wishlist");
      } else {
        await addToWishlist();
        toast.success("Produk ditambahkan ke wishlist");
      }

      revalidateWishlistStatus();
      mutate("/v1/wishlists");
    } catch (error) {
      console.error("WISHLIST ERROR:", error);
      toast.error("Gagal memperbarui wishlist");
    }
  };

  return (
    <>
      <Card className="fixed bottom-0 left-0 w-full z-50 rounded-t-2xl lg:rounded-xl border-t bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)] lg:shadow-lg lg:border-gray-200 lg:static lg:w-full lg:z-auto overflow-hidden">
        <CardContent className="">
          <h3 className="hidden lg:block font-bold text-gray-900 mb-4 text-base">
            Atur jumlah dan catatan
          </h3>

          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <div className="flex items-center gap-3">
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
              <span className="text-sm text-gray-500 hidden lg:inline">
                Stok:{" "}
                <span className="font-bold text-gray-800">
                  {activeVariant.stock}
                </span>
              </span>
            </div>

            <div className="lg:hidden flex flex-col items-end">
              <span className="text-xs text-gray-500 font-medium">
                Subtotal
              </span>
              <span className="font-bold text-base text-gray-900">
                {product.price !== null
                  ? formatRupiah((product.price + activeVariant.price) * qty)
                  : formatRupiah(
                      (product.original_price + activeVariant.price) * qty,
                    )}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4 lg:mb-6">
            <div className="flex justify-between items-center">
              {!showNote ? (
                <button
                  onClick={() => setShowNote(true)}
                  className="flex items-center gap-1 text-sm text-green-600 font-medium hover:underline"
                >
                  <Pencil className="w-3 h-3" /> Tambah Catatan
                </button>
              ) : (
                <span className="text-sm font-medium text-gray-800">
                  Catatan untuk toko
                </span>
              )}

              <span className="text-sm text-gray-500 lg:hidden inline">
                Stok:{" "}
                <span className="font-bold text-gray-800">
                  {activeVariant.stock}
                </span>
              </span>
            </div>

            {showNote && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Contoh: Warna putih, ukuran XL"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full text-sm border-b border-gray-300 focus:border-green-500 outline-none py-2 pr-16 bg-transparent transition-colors"
                  maxLength={144}
                />
                <button
                  onClick={() => {
                    setShowNote(false);
                    setNote("");
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-red-500"
                >
                  Batalkan
                </button>
              </div>
            )}
          </div>

          <div className="hidden lg:flex justify-between items-center mb-6">
            <span className="text-gray-500 font-medium">Subtotal</span>
            <span className="font-bold text-xl text-gray-900">
              {product.price !== null
                ? formatRupiah((product.price + activeVariant.price) * qty)
                : formatRupiah(
                    (product.original_price + activeVariant.price) * qty,
                  )}
            </span>
          </div>

          <div className="flex gap-2 lg:flex-col lg:space-y-3 lg:gap-0">
            <Button
              className="flex-1 lg:w-full bg-green-600 hover:bg-green-700 font-bold h-11 text-md rounded-lg"
              onClick={handleAddToCart}
              disabled={isMutating}
            >
              + Keranjang
            </Button>
            <Button
              variant="outline"
              className="flex-1 lg:w-full border-green-600 text-green-600 hover:bg-green-50 font-bold h-11 text-md rounded-lg"
              onClick={() => {
                if (!isLoggedIn) {
                  setShowLoginModal(true);
                  return;
                }
              }}
            >
              Beli Langsung
            </Button>
            <Button
              variant="outline"
              className="flex-1 lg:w-full border-green-600 text-green-600 hover:bg-green-50 font-bold h-11 text-md rounded-lg"
              onClick={handleStartChat}
              disabled={isStartingChat || isSendingProductChat}
            >
              <MessageCircle className="w-4 h-4" />
              Chat Toko
            </Button>
          </div>

          <div className="flex justify-between mt-3 lg:mt-4 pt-3 lg:pt-4 border-t text-sm font-semibold text-gray-600">
            <button className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button
              className={`flex items-center gap-1.5 transition-colors ${
                isWishlisted
                  ? "text-red-500 hover:text-red-600"
                  : "hover:text-red-500"
              }`}
              onClick={handleToggleWishlist}
              disabled={isUpdatingWishlist}
            >
              <Heart
                className="w-4 h-4"
                fill={isWishlisted ? "currentColor" : "none"}
              />
              {isWishlisted ? "Tersimpan" : "Wishlist"}
            </button>
          </div>
        </CardContent>
      </Card>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default PurchaseCard;
