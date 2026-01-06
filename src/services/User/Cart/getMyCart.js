import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const getMyCart = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

export const useMyCart = (enabled = true) => {
  const url = enabled ? `/carts` : null;

  return useSWR(url, getMyCart, {
    refreshInterval: 20000,
  });
};
