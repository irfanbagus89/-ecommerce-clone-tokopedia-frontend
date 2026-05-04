import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

const createReview = async (url, { arg }) => {
  const res = await fetcher.post(url, arg);
  return res.data;
};

const uploadReviewImages = async (url, { arg }) => {
  const { reviewId, files } = arg;
  const formData = new FormData();
  (files || []).forEach((f) => formData.append("images", f));
  const res = await fetcher.post(`/v1/reviews/${reviewId}/images`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

const markReviewHelpful = async (url, { arg }) => {
  const res = await fetcher.post(`/v1/reviews/${arg.id}/helpful`);
  return res.data;
};

const getProductReviews = async ([url, params]) => {
  const res = await fetcher.get(url, { params });
  return res.data.Data;
};

export const useCreateReview = () =>
  useSWRMutation("/v1/reviews", createReview);

export const useUploadReviewImages = () =>
  useSWRMutation("/v1/reviews/upload-images", uploadReviewImages);

export const useMarkReviewHelpful = () =>
  useSWRMutation("/v1/reviews/helpful", markReviewHelpful);

export const useProductReviews = (
  productId,
  { page = 1, limit = 10, sort = "newest", rating = 0, withMedia = false } = {},
) => {
  const params = {
    page,
    limit,
    sort,
    ...(rating > 0 && { rating }),
    ...(withMedia && { withMedia: true }),
  };
  return useSWR(
    productId ? [`/v1/reviews/${productId}`, params] : null,
    getProductReviews,
    { keepPreviousData: true, revalidateOnFocus: false },
  );
};
