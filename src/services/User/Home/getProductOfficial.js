import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWR from "swr";

const getOfficialProducts = async (url) => {
  const res = await fetcher.get(url);
  return res.data;
};

export const useOfficialProducts = (
  page = 1,
  limit = 5,
  enabled = true
) => {
  const url = enabled
    ? `/products/official?page=${page}&limit=${limit}`
    : null;

  return useSWR(url, getOfficialProducts,{
    refreshInterval: 20000,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
  });
};
