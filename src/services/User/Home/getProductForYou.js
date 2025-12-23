import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWR from "swr";

const getProductForYou = async (url) => {
  const res = await fetcher.get(url);
  return res.data;
};

export const useProductForYou = (
  page = 1,
  limit = 10,
  enabled = true
) => {
  const url = enabled
    ? `/products/foryou?page=${page}&limit=${limit}`
    : null;

  return useSWR(url, getProductForYou,{
    refreshInterval: 20000,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
  });
};
