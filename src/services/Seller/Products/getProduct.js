import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const getProduct = async (url) => {
  const res = await fetcher.get(url);
  return res.data?.Data;
};

export const useGetProduct = (id) => {
  const url = id ? `/products/${id}` : null;
  return useSWR(url, getProduct, { revalidateOnFocus: false });
};

export default useGetProduct;
