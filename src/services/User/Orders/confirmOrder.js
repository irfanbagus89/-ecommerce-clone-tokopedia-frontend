import { fetcher } from "@/lib/fetcher/fetcherApi";
import useSWRMutation from "swr/mutation";

const confirmOrder = async (url) => {
  const res = await fetcher.post(url);
  return res.data;
};

export const useConfirmOrder = (id) =>
  useSWRMutation(`/v1/orders/my-orders/${id}/confirm`, confirmOrder);
