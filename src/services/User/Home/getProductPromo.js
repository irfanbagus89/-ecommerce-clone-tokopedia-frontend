import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWR from "swr";

const getProductPromo = async (url) => {
  const res = await fetcher.get(url);
  return res.data;
};

export const useProductPromo = (
  page = 1,
  limit = 10,
  enabled = true
) => {
  const url = enabled
    ? `/products/promo?page=${page}&limit=${limit}`
    : null;

  return useSWR(url, getProductPromo,{
    refreshInterval: 20000,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
  });
};
