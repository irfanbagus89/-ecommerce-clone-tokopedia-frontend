import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const getProductDetail = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

export const useProductDetail = (productId, enabled = true) => {
  const url = enabled && productId ? `/products/${productId}` : null;

  return useSWR(url, getProductDetail, {
    refreshInterval: 20000,
  });
};
