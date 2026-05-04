"use client";

import { useState } from "react";
import {
  useWishlists,
} from "@/services/User/Wishlists/getWishlists";
import { useRemoveFromWishlist } from "@/services/User/Wishlists/wishlistActions";
import { Button } from "@/components/ui/button";
import formatRupiah from "@/lib/currencyHelper";
import { Heart, HeartOff, Package, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "@/lib/toast";
import { mutate } from "swr";

const WishlistCard = ({ item, onRemove }) => {
  const { trigger: remove, isMutating } = useRemoveFromWishlist(item.product_id);

  const handleRemove = async () => {
    try {
      await remove();
      toast.success("Produk dihapus dari wishlist");
      onRemove();
    } catch {
      toast.error("Gagal menghapus dari wishlist");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <Link href={`/product/${item.category}/${item.product_id}`} className="block">
        <div className="relative h-48 bg-gray-50">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.product_name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package size={40} className="text-gray-300" />
            </div>
          )}
          {item.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              -{item.discount}%
            </div>
          )}
        </div>
      </Link>

      <div className="p-3">
        <Link href={`/product/${item.category}/${item.product_id}`}>
          <p className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-[#03AC0E] transition-colors">
            {item.product_name}
          </p>
        </Link>
        <div className="mt-1">
          <p className="text-base font-bold text-[#03AC0E]">
            {formatRupiah(item.price)}
          </p>
          {item.original_price && item.original_price !== item.price && (
            <p className="text-xs text-gray-400 line-through">
              {formatRupiah(item.original_price)}
            </p>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{item.store_name}</p>

        <div className="flex gap-2 mt-3">
          <Link href={`/product/${item.category}/${item.product_id}`} className="flex-1">
            <Button
              size="sm"
              className="w-full bg-[#03AC0E] hover:bg-[#028a0b] text-white text-xs"
            >
              <ShoppingCart size={13} className="mr-1" />
              Beli
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            className="text-red-400 border-red-200 hover:bg-red-50 hover:border-red-300"
            onClick={handleRemove}
            disabled={isMutating}
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const WishlistContainer = () => {
  const { data: wishlists, isLoading, mutate: revalidate } = useWishlists();

  const items = wishlists || [];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-6 flex items-center gap-3">
        <Heart size={24} className="text-[#03AC0E]" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wishlist Saya</h1>
          <p className="text-sm text-gray-500">
            {items.length} produk tersimpan
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-64 bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HeartOff className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Wishlist masih kosong
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Simpan produk favoritmu agar mudah ditemukan
          </p>
          <Link href="/home">
            <Button className="bg-[#03AC0E] hover:bg-[#028a0b] text-white">
              Mulai Belanja
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <WishlistCard
              key={item.product_id}
              item={item}
              onRemove={revalidate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistContainer;
