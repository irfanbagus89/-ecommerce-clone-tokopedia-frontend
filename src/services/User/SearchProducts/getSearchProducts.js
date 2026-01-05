import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const getSearchProduct = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

export const useSearchProduct = (page, limit, search, enabled = true) => {
  const url = enabled
    ? `/products?page=${page}&limit=${limit}&search=${search}`
    : null;

  return useSWR(url, getSearchProduct, {
    refreshInterval: 20000,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
  });
};
