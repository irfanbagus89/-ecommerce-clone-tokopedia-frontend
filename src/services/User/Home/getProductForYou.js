import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRInfinite from "swr/infinite";

const getProductForYou = async (url) => {
  const res = await fetcher.get(url);
  return res.data;
};

export const useProductForYou = (
  limit = 10,
  enabled = true
) => {
  const getKey = (pageIndex, previousPageData) => {
    // stop kalau data kosong
    if (previousPageData && previousPageData?.Data?.products?.length === 0) {
      return null;
    }

    if (!enabled) return null;

    return `/products/foryou?page=${pageIndex + 1}&limit=${limit}`;
  };

  return useSWRInfinite(getKey, getProductForYou, {
    refreshInterval: 20000,
    revalidateFirstPage: false,
  });
};
