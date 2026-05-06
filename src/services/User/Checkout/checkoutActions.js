import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const checkout = async (url, { arg }) => {
  const res = await fetcher.post(url, arg);
  return res.data;
};

export const useCheckout = () =>
  useSWRMutation("/v1/orders/checkout", checkout);
