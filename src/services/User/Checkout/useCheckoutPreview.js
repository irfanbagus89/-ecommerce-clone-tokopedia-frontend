import useSWR from "swr";
import { fetcher } from "@/lib/fetcher/fetcherApi";

const postPreview = async (url, payload) => {
  if (!payload?.cart_item_ids?.length) return null;
  const res = await fetcher.post(url, payload);
  return res.data?.Data ?? null;
};

/**
 * Memanggil POST /v1/orders/checkout-preview untuk menghitung ringkasan harga
 * sepenuhnya di backend. Key SWR berubah otomatis saat cart/shipping/voucher berubah.
 */
export const useCheckoutPreview = ({ cartItemIds, shippingCost, voucherCode }) => {
  const key =
    cartItemIds?.length
      ? ["/v1/orders/checkout-preview", cartItemIds, shippingCost ?? 0, voucherCode ?? ""]
      : null;

  return useSWR(
    key,
    ([url, ids, cost, voucher]) =>
      postPreview(url, {
        cart_item_ids: ids,
        shipping_cost: cost,
        ...(voucher ? { voucher_code: voucher } : {}),
      }),
    { revalidateOnFocus: false, keepPreviousData: true },
  );
};
