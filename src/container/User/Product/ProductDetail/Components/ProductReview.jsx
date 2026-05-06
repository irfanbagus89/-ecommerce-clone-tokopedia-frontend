"use client";
import { useState } from "react";
import ReviewFilter from "./ReviewFilter";
import ReviewList from "./ReviewList";
import ReviewStats from "./ReviewStats";
import { useProductReviews } from "@/services/User/DetailProduct/getReviewsProduct";
import ProductReviewsSkeleton from "@/components/ui/productReviewsSkeleton";

const ProductReviews = ({ productId }) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("helpful");
  const [rating, setRating] = useState([]);
  const [withMedia, setWithMedia] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { data, isLoading } = useProductReviews(productId, {
    page,
    limit: 10,
    sort,
    rating,
    withMedia,
  });
  return (
    <section className="py-10 border-t mt-10" id="ulasan">
      {isLoading ? (
        <ProductReviewsSkeleton />
      ) : (
        <>
          <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase">
            Ulasan Pembeli
          </h2>
          <ReviewStats stats={data.ratingStats} />

          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="lg:hidden w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg mb-4"
          >
            <span className="font-medium text-sm">Filter Ulasan</span>
            <svg
              className={`w-5 h-5 transition-transform ${showMobileFilter ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showMobileFilter && (
            <div className="lg:hidden bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <ReviewFilter
                rating={rating}
                setRating={setRating}
                withMedia={withMedia}
                setWithMedia={setWithMedia}
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            <div className="lg:col-span-3 hidden lg:block">
              <ReviewFilter
                rating={rating}
                setRating={setRating}
                withMedia={withMedia}
                setWithMedia={setWithMedia}
              />
            </div>

            <div className="lg:col-span-9">
              <ReviewList
                reviews={data.ratingList}
                page={page}
                setPage={setPage}
                sort={sort}
                setSort={setSort}
                pagination={data.pagination}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductReviews;
