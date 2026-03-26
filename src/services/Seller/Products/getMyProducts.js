import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const getMyProducts = async ([url, params]) => {
  const res = await fetcher.get(url, {
    params,
  });

  return res.data.Data;
};

export const useMyProducts = (
  { page = 1, limit = 10, search = "", sort = "name", order = "asc" } = {},
  enabled = true
) => {
  const shouldFetch = enabled;

  const params = shouldFetch
    ? {
        page,
        limit,
        sort,
        order,
        ...(search && { search }), 
      }
    : null;

  return useSWR(
    shouldFetch ? ["/v1/seller/my-products", params] : null,
    getMyProducts,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );
};
