import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";

export const getCountMyCart = async (url) => {
  const result = await fetcher.get(url);

  return result.data.Data;
};

export const useCountMyCart = () => {
  return useSWR("/v1/carts/count-mycart", getCountMyCart);
};
