import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const getProductReviews = async ([url, params]) => {
  const res = await fetcher.get(url, {
    params,
  });

  return res.data.Data;
};

export const useProductReviews = (
  productId,
  { page = 1, limit = 10, sort = "helpful", rating, withMedia } = {},
  enabled = true
) => {
  const shouldFetch = enabled && productId;

  const params = shouldFetch
    ? {
        page,
        limit,
        sort,
        ...(rating?.length && { rating: `{${rating.join(",")}}` }),
        ...(withMedia && { withMedia: true }),
      }
    : null;

  return useSWR(
    shouldFetch ? [`/reviews/${productId}`, params] : null,
    getProductReviews,
    {
      keepPreviousData: true,
      refreshInterval: 20000,
    }
  );
};
