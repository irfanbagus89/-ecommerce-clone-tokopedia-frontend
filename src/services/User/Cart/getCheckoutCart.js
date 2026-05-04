import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const getCheckoutCart = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

export const useCheckoutCart = () =>
  useSWR("/v1/carts/checkout", getCheckoutCart, {
    revalidateOnFocus: false,
  });
