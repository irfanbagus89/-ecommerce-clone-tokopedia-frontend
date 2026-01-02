import { useState } from "react";
import ReviewFilter from "./ReviewFilter";
import ReviewList from "./ReviewList";
import ReviewStats from "./ReviewStats";
import { useProductReviews } from "@/services/User/DetailProduct/getReviewsProduct";

const ProductReviews = ({ productId }) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("helpful");
  const [rating, setRating] = useState([]);
  const [withMedia, setWithMedia] = useState(false);
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
        <p>Loading ulasan...</p>
      ) : (
        <>
          <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase">
            Ulasan Pembeli
          </h2>
          <ReviewStats stats={data.ratingStats} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
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
