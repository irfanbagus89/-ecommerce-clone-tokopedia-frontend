import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const getPaymentMethods = async (url) => {
  const res = await fetcher.get(url);
  return res.data?.Data || res.data?.data || [];
};

export const usePaymentMethods = () =>
  useSWR("/v1/payments/methods", getPaymentMethods, { revalidateOnFocus: false });
