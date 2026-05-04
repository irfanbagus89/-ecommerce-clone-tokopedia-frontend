import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher/fetcherApi";

/**
 * POST /api/v1/orders/checkout
 * Mengirim cart_item_ids + alamat + payment_method_code ke backend.
 * Backend men-charge ke Midtrans Core API dan mengembalikan instructions
 * (va_number / qr_string / deeplink_url) beserta midtrans_order_id.
 */
const checkout = async (url, { arg }) => {
  const res = await fetcher.post(url, arg);
  return res.data;
};

export const useCheckout = () =>
  useSWRMutation("/v1/orders/checkout", checkout);
