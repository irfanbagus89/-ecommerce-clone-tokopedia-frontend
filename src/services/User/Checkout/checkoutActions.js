import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher/fetcherApi";

/**
 * POST /api/v1/orders/checkout
 * Mengirim cart_item_ids + alamat ke backend,
 * menerima Midtrans snap_token dan redirect_url.
 */
const checkout = async (url, { arg }) => {
  const res = await fetcher.post(url, arg);
  return res.data;
};

export const useCheckout = () =>
  useSWRMutation("/v1/orders/checkout", checkout);
