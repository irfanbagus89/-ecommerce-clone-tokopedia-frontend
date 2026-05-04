import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const getOrderDetail = async (url) => {
  const res = await fetcher.get(url);
  return res.data.Data;
};

export const useOrderDetail = (id) => {
  return useSWR(id ? `/v1/orders/my-orders/${id}` : null, getOrderDetail, {
    revalidateOnFocus: false,
  });
};
