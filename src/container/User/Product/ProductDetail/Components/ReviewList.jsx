import Image from "next/image";
import { Star, ThumbsUp, MoreVertical } from "lucide-react";
import { CustomSelect } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomPagination } from "@/components/ui/pagination";
import formatDate from "@/lib/dateFormat";

const ReviewList = ({
  reviews,
  page,
  setPage,
  sort,
  setSort,
  pagination,
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm">
          <span className="font-bold text-gray-900">ULASAN PILIHAN</span>
          <p className="text-gray-500 mt-1">
            Menampilkan {reviews.length} dari {pagination.total} ulasan
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-700">Urutkan</span>
          <CustomSelect
            value={sort}
            onValueChange={(val) => {
              setPage(1);
              setSort(val);
            }}
            options={[
              { label: "Paling Membantu", value: "helpful" },
              { label: "Terbaru", value: "newest" },
              { label: "Rating Tertinggi", value: "highest" },
              { label: "Rating Terendah", value: "lowest" },
            ]}
            className="w-[180px] h-9 text-sm"
          />
        </div>
      </div>

      <div className="space-y-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-100 pb-8 last:border-0"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">
                {formatDate(review.date)}
              </span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback className="bg-gray-100 text-xs font-bold text-gray-500">
                    {review.user?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-bold text-gray-900">
                  {review.user}
                </span>
              </div>
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </div>

            {review.variant && (
              <p className="text-xs text-green-600 mb-3">
                Varian: {review.variant}
              </p>
            )}

            <p className="text-sm text-gray-800 mb-3">{review.content}</p>

            {review.images?.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-16 h-16 rounded-md overflow-hidden"
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-1 text-gray-500">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm">
                Membantu {review.helpful > 0 && `(${review.helpful})`}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex">
        <CustomPagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
          className="justify-start!"
        />
      </div>
    </div>
  );
};

export default ReviewList;
