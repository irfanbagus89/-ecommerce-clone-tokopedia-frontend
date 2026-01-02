import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWR from "swr";

const getRekomendasiProductByStore = async (url) => {
  const res = await fetcher.get(url);
  return res.data;
};

export const useRekomendasiProductByStore = (
  page = 1,
  limit = 10,
  sellerId,
  categoryId,
  id
) => {
  const url = `/products/recommendations-by-store?sellerId=${sellerId}&categoryId=${categoryId}&page=${page}&limit=${limit}&id=${id}`;
  
  return useSWR(url, getRekomendasiProductByStore, {
    refreshInterval: 20000,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
  });
};
