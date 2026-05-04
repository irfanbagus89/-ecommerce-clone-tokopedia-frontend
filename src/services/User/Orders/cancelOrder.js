import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

const cancelOrder = async (url) => {
  const res = await fetcher.post(url);
  return res.data;
};

export const useCancelOrder = (id) =>
  useSWRMutation(`/v1/orders/my-orders/${id}/cancel`, cancelOrder);
