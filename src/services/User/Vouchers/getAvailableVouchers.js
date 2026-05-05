import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const fetchAvailableVouchers = async (url) => {
  const res = await fetcher.get(url);
  return res.data?.Data ?? [];
};

export const useAvailableVouchers = (subtotal) => {
  const url = subtotal > 0
    ? `/v1/vouchers/available?subtotal=${subtotal}`
    : `/v1/vouchers/available`;

  return useSWR(url, fetchAvailableVouchers, {
    revalidateOnFocus: false,
  });
};
