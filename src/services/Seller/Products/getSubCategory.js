import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const getSubCategories = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

export const useSubCategories = (enabled = true) => {
  const url = enabled ? "/categories/sub-categories" : null;

  return useSWR(url, getSubCategories, {
    refreshInterval: 20000,
  });
};
