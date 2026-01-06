import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRInfinite from "swr/infinite";

const getOfficialProducts = async (url) => {
  const res = await fetcher.get(url);
  return res.data;
};

export const useOfficialProducts = (
  limit = 5,
  enabled = true
) => {
  const getKey = (pageIndex, previousPageData) => {
    // stop kalau data habis
    if (
      previousPageData &&
      previousPageData.page >= previousPageData.totalPages
    ) {
      return null;
    }

    if (!enabled) return null;

    return `/products/official?page=${pageIndex + 1}&limit=${limit}`;
  };

  return useSWRInfinite(getKey, getOfficialProducts, {
    revalidateFirstPage: false,
    refreshInterval: 20000,
  });
};
