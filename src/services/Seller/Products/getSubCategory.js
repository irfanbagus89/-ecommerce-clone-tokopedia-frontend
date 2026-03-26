import useSWR from "swr";
import { basicAuthFetcher } from "@/lib/fetcher/fetcherApi";

const getSubCategories = async (url) => {
  const res = await basicAuthFetcher.get(url);
  return res.data.Data;
};

export const useSubCategories = (enabled = true) => {
  const url = enabled ? "/v1/categories/sub-categories" : null;

  return useSWR(url, getSubCategories, {
    refreshInterval: 20000,
  });
};
