"use client";

import { useState, useRef } from "react";
import {
  useCreateReview,
  useUploadReviewImages,
} from "@/services/User/Reviews/createReview";
import { Button } from "@/components/ui/button";
import { Star, X, Camera, Image as ImageIcon, Trash2 } from "lucide-react";
import { toast } from "@/lib/toast";
import { mutate } from "swr";
import Image from "next/image";

const ReviewModal = ({ order, onClose }) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(order?.items?.[0]);
  const [images, setImages] = useState([]);
  const fileRef = useRef(null);

  const { trigger: triggerCreate, isMutating: isCreating } = useCreateReview();
  const { trigger: triggerUpload, isMutating: isUploading } =
    useUploadReviewImages();

  const isMutating = isCreating || isUploading;

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    const max = 5;
    const next = [...images, ...files].slice(0, max);
    setImages(next);
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Tulis ulasan terlebih dahulu");
      return;
    }
    if (!selectedItem) {
      toast.error("Pilih produk yang akan diulas");
      return;
    }

    try {
      const created = await triggerCreate({
        order_id: order.id,
        product_id: selectedItem.product_id,
        variant_id: selectedItem.variant_id,
        rating,
        comment,
      });

      const reviewId =
        created?.Data?.id || created?.data?.id || created?.id || null;

      if (reviewId && images.length > 0) {
        try {
          await triggerUpload({ reviewId, files: images });
        } catch (err) {
          toast.error("Ulasan tersimpan, tapi gagal upload gambar");
        }
      }

      toast.success("Ulasan berhasil dikirim!");
      mutate((key) => Array.isArray(key) && key[0] === "/v1/orders/my-orders");
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal mengirim ulasan");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-gray-900">Beri Ulasan</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {order.items?.length > 1 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Pilih Produk
              </p>
              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <button
                    key={item.id || i}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                      selectedItem?.product_id === item.product_id
                        ? "border-[#03AC0E] bg-green-50 text-[#03AC0E]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {item.product_name}
                    {item.variant_name && (
                      <span className="text-xs text-gray-400 ml-1">
                        ({item.variant_name})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Rating</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={28}
                    className={`${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {rating === 5
                ? "Sangat Puas"
                : rating === 4
                  ? "Puas"
                  : rating === 3
                    ? "Cukup"
                    : rating === 2
                      ? "Kurang"
                      : "Sangat Kurang"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Ulasan</p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Bagikan pengalaman belanjamu..."
              rows={4}
              maxLength={500}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#03AC0E] focus:ring-2 focus:ring-[#03AC0E]/20 resize-none"
            />
            <p className="text-xs text-gray-400 text-right">
              {comment.length}/500
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Foto Ulasan{" "}
              <span className="text-xs text-gray-400">(maks. 5 foto)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {images.map((file, i) => (
                <div
                  key={i}
                  className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-0.5 right-0.5 w-5 h-5 bg-black/60 hover:bg-red-500 rounded-full flex items-center justify-center text-white"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-16 h-16 rounded-lg border border-dashed border-gray-300 hover:border-[#03AC0E] flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-[#03AC0E] transition-colors"
                >
                  <Camera size={16} />
                  <span className="text-[9px]">Tambah</span>
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFiles}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-5 border-t border-gray-100 sticky bottom-0 bg-white">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isMutating}
          >
            Batal
          </Button>
          <Button
            className="flex-1 bg-[#03AC0E] hover:bg-[#028a0b] text-white"
            onClick={handleSubmit}
            disabled={isMutating}
          >
            {isMutating ? "Mengirim..." : "Kirim Ulasan"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
